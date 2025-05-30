import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  username: string;
  email: string; // Add email to the user object
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string, email: string) => boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (username: string, password: string): boolean => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
    if (storedUsers[username]?.password === password) {
      const loggedInUser = {
        username,
        email: storedUsers[username].email,
        isVerified: storedUsers[username].isVerified,
      };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const signup = (username: string, password: string, email: string): boolean => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
    if (storedUsers[username]) {
      return false; // Username already exists
    }
    storedUsers[username] = { password, email, isVerified: false };
    localStorage.setItem("users", JSON.stringify(storedUsers));

    const newUser = { username, email, isVerified: false };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
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