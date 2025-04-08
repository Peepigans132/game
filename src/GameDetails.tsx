import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../src/AuthContext";
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

interface Game {
  id: number;
  src: string;
  alt: string;
  info: string;
}

const allGames: Game[] = [
  { id: 1, src: "https://m.media-amazon.com/images/I/614zA+E6wvL._AC_UF1000,1000_QL80_.jpg", alt: "Donkey Kong Country 2", info: "A classic platformer game." },
  { id: 2, src: "https://upload.wikimedia.org/wikipedia/en/3/32/Super_Mario_World_Coverart.png", alt: "Super Mario World", info: "A legendary Mario adventure." },
  { id: 3, src: "https://www.vgmpf.com/Wiki/images/2/2c/Legend_of_Zelda_-_NES_-_Album_Art.jpg", alt: "The Legend of Zelda", info: "An epic action-adventure game." },
  { id: 4, src: "https://upload.wikimedia.org/wikipedia/en/f/f1/Mega_Man_X_Coverart.png", alt: "Mega Man X", info: "A fast-paced action game." },
];

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const game = allGames.find((g) => g.id === Number(id));

  const [openDialog, setOpenDialog] = useState(false);

  if (!game) {
    return (
      <Container>
        <Typography variant="h4">Game Not Found</Typography>
      </Container>
    );
  }

  const handleEditClick = () => {
    if (!user) {
      setOpenDialog(true);
    } else {
      // Redirect to edit functionality
    }
  };

  return (
    <Container>
      <Typography variant="h4">{game.alt}</Typography>
      <img src={game.src} alt={game.alt} style={{ maxWidth: "100%" }} />
      <Typography>{game.info}</Typography>
      <Button variant="contained" color="primary" onClick={handleEditClick}>
        Edit Game Info
      </Button>

      {/* Login Required Dialog with Separate Buttons */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography>You must log in or sign up to edit the game info.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => navigate("/login")} variant="contained" color="primary">
            Log In
          </Button>
          <Button onClick={() => navigate("/signup")} variant="contained" color="secondary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GameDetails;
