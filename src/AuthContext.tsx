import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  username: string;
  isVerified: boolean; // Add isVerified property
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
    if (storedUsers[username]?.password === password) {
      setUser({ username, isVerified: storedUsers[username].isVerified });
      localStorage.setItem(
        "user",
        JSON.stringify({ username, isVerified: storedUsers[username].isVerified })
      );
      return true;
    }
    return false;
  };

  const signup = (username: string, password: string): boolean => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}");
    if (storedUsers[username]) return false;
    storedUsers[username] = { password, isVerified: false }; // Default isVerified to false
    localStorage.setItem("users", JSON.stringify(storedUsers));
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

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};