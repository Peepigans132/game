import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  username: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, rememberMe: boolean) => boolean;
  signup: (username: string, password: string) => boolean;
  verifyOTP: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const registeredUsers: { username: string; password: string }[] = [];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

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
      return false;
    }

    const newUser = { username, isVerified: false };
    setUser(newUser);

    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      sessionStorage.setItem("user", JSON.stringify(newUser));
    }

    return true;
  };

  const signup = (username: string, password: string): boolean => {
    const userExists = registeredUsers.some((user) => user.username === username);

    if (userExists) {
      return false;
    }

    registeredUsers.push({ username, password });
    return true;
  };

  const verifyOTP = () => {
    if (user) {
      const updatedUser = { ...user, isVerified: true };
      setUser(updatedUser);
      if (localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, verifyOTP, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};