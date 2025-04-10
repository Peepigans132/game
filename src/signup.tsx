import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/AuthContext";
import { Container, TextField, Button, Typography } from "@mui/material";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = () => {
    const success = signup(username, password);
    if (success) {
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } else {
      setError("Username is already taken. Please choose a different one.");
    }
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
      <Button variant="contained" color="primary" onClick={handleSignup}>
        Sign Up
      </Button>
    </Container>
  );
};

export default Signup;