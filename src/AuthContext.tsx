import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  username: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string) => void;
  verifyOTP: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string) => {
    setUser({ username, isVerified: false }); // User must verify OTP
  };

  const verifyOTP = () => {
    if (user) setUser({ ...user, isVerified: true }); // Mark OTP as verified
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, verifyOTP, logout }}>
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