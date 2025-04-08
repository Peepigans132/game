import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../src/AuthContext";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Using login function to store user
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password cannot be empty.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulating account creation (replace with AWS Cognito or database logic)
    console.log("Account created:", { username, password });

    // Automatically log in user after sign-up
    login(username);
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
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
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Create Account
      </Button>
      <Typography variant="body2">
        Already have an account? <Button onClick={() => navigate("/login")}>Log in</Button>
      </Typography>
    </Container>
  );
};

export default SignUp;
