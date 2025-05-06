import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/AuthContext";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const success = signup(username, password, email); // Pass all three arguments
    if (success) {
      navigate("/"); // Redirect to the home page
    } else {
      setError("Username already exists.");
    }
  };

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSignup}>
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
};

export default Signup;