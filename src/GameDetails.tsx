import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../src/AuthContext";
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

const GameDetails: React.FC = () => {
  useParams<{ id: string; }>();
  const { user } = useAuth(); // Check authentication state

  const [open, setOpen] = useState(false);
  const [editedGame, setEditedGame] = useState({ title: "", info: "" });

  if (!user) {
    return (
      <Container>
        <Typography variant="h6">You must log in to edit game info.</Typography>
      </Container>
    );
  }

  if (!user.isVerified) {
    return (
      <Container>
        <Typography variant="h6">Two-Factor Authentication is required to edit game info.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4">{editedGame.title}</Typography>
      <Typography>{editedGame.info}</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Edit Game Info
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Game Info</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={editedGame.title}
            onChange={(e) => setEditedGame({ ...editedGame, title: e.target.value })}
          />
          <TextField
            label="Info"
            fullWidth
            value={editedGame.info}
            onChange={(e) => setEditedGame({ ...editedGame, info: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GameDetails;
