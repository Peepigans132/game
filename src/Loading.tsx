import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "../src/Login";
import Signup from "../src/signup";
import AccountSettings from "./AccountSettings";
import GameDetails from "./GameDetails";
import Loading from "./Loading";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading animation during route changes
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading time
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <AuthProvider>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/game-details/:id" element={<GameDetails />} />
        </Routes>
      )}
    </AuthProvider>
  );
};

export default App;