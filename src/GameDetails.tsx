import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../src/AuthContext";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

interface Game {
  id: number;
  src: string;
  alt: string;
  info: string;
}

const allGames: Game[] = [
  {
    id: 1,
    src: "https://m.media-amazon.com/images/I/614zA+E6wvL._AC_UF1000,1000_QL80_.jpg",
    alt: "Donkey Kong Country 2",
    info: "A classic platformer game.",
  },
  {
    id: 2,
    src: "https://upload.wikimedia.org/wikipedia/en/3/32/Super_Mario_World_Coverart.png",
    alt: "Super Mario World",
    info: "A legendary Mario adventure.",
  },
  {
    id: 3,
    src: "https://www.vgmpf.com/Wiki/images/2/2c/Legend_of_Zelda_-_NES_-_Album_Art.jpg",
    alt: "The Legend of Zelda",
    info: "An epic action-adventure game.",
  },
  {
    id: 4,
    src: "https://upload.wikimedia.org/wikipedia/en/f/f1/Mega_Man_X_Coverart.png",
    alt: "Mega Man X",
    info: "A fast-paced action game.",
  },
];

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const gameIndex = allGames.findIndex((g) => g.id === Number(id));
  const game = allGames[gameIndex];

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedInfo, setEditedInfo] = useState(game?.info || "");

  if (!game) {
    return (
      <Container>
        <Typography variant="h4">Game Not Found</Typography>
      </Container>
    );
  }

  const handleEditClick = () => {
    if (!user) {
      alert("You must be logged in to edit game information.");
    } else {
      setEditDialogOpen(true);
    }
  };

  const handleSave = () => {
    if (gameIndex !== -1) {
      allGames[gameIndex].info = editedInfo; // Update the game info in the array
      alert("Game information updated!");
    }
    setEditDialogOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4">{game.alt}</Typography>
      <img src={game.src} alt={game.alt} style={{ maxWidth: "100%" }} />
      <Typography>{game.info}</Typography>
      <Button variant="contained" color="primary" onClick={handleEditClick}>
        Edit Game Info
      </Button>

      {/* Edit Game Info Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Game Info</DialogTitle>
        <DialogContent>
          <TextField
            label="Game Info"
            fullWidth
            margin="normal"
            value={editedInfo}
            onChange={(e) => setEditedInfo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GameDetails;