import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Typography, Container, TextField, Button } from "@mui/material";

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editedInfo, setEditedInfo] = useState("");

  if (!user) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          You must be logged in to edit game information.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/signup")}
          style={{ marginLeft: "10px" }}
        >
          Sign Up
        </Button>
      </Container>
    );
  }

  const handleSave = () => {
    console.log(`Game ID: ${id}, New Info: ${editedInfo}`);
    alert("Game information updated!");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Game Details (ID: {id})
      </Typography>
      <TextField
        label="Game Info"
        fullWidth
        margin="normal"
        value={editedInfo}
        onChange={(e) => setEditedInfo(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={!user.isVerified} // Disable if the user hasn't verified OTP
      >
        Save
      </Button>
    </Container>
  );
};

export default GameDetails;