import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  username: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, rememberMe: boolean) => boolean; // Returns false if login fails
  signup: (username: string, password: string) => boolean; // Returns false if username is taken
  verifyOTP: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const registeredUsers: { username: string; password: string }[] = []; // Array to store registered users

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage or sessionStorage when the app initializes
  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string, rememberMe: boolean): boolean => {
    const foundUser = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (!foundUser) {
      return false; // Invalid username or password
    }

    const newUser = { username, isVerified: false };
    setUser(newUser);

    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(newUser)); // Persist user in localStorage
    } else {
      sessionStorage.setItem("user", JSON.stringify(newUser)); // Persist user in sessionStorage
    }

    return true;
  };

  const signup = (username: string, password: string): boolean => {
    const userExists = registeredUsers.some((user) => user.username === username);

    if (userExists) {
      return false; // Username is already taken
    }

    registeredUsers.push({ username, password }); // Add new user to the registered users list
    return true;
  };

  const verifyOTP = () => {
    if (user) {
      const updatedUser = { ...user, isVerified: true };
      setUser(updatedUser);
      if (localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
      } else {
        sessionStorage.setItem("user", JSON.stringify(updatedUser)); // Update sessionStorage
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
    sessionStorage.removeItem("user"); // Remove user from sessionStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, verifyOTP, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};