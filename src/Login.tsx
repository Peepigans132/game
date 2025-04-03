import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/AuthContext";
import { Container, TextField, Button, Typography } from "@mui/material";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const { login, verifyOTP } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Simulating AWS Cognito login (replace with actual Cognito SDK)
    if (username === "admin" && password === "password123") {
      login(username);
      setShowOtpField(true); // Show OTP field after password validation
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleVerifyOTP = async () => {
    // Simulating OTP verification via AWS Cognito (replace with actual API call)
    if (otp === "123456") {
      verifyOTP();
      navigate("/");
    } else {
      setError("Invalid OTP.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {!showOtpField ? (
        <>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">Enter OTP Code</Typography>
          <TextField
            label="OTP"
            fullWidth
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleVerifyOTP}>
            Verify OTP
          </Button>
        </>
      )}
    </Container>
  );
};

export default Login;
