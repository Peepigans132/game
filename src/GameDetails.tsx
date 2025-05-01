import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../src/AuthContext";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from "@mui/material";
import "../src/App.css";

interface Game {
  id: number;
  src: string;
  alt: string;
  info: string;
}

const allGames: Game[] = [
  {
    id: 1,
    src: "https://upload.wikimedia.org/wikipedia/en/c/c3/DK_Country_2.jpg",
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
    src: "https://upload.wikimedia.org/wikipedia/en/2/21/The_Legend_of_Zelda_A_Link_to_the_Past_SNES_Game_Cover.jpg",
    alt: "The Legend of Zelda",
    info: "An epic action-adventure game.",
  },
  {
    id: 4,
    src: "https://upload.wikimedia.org/wikipedia/en/f/f1/Mega_Man_X_Coverart.png",
    alt: "Mega Man X",
    info: "A fast-paced action game.",
  },
  {
    id: 5,
    src: "https://cdn.thegamesdb.net/images/original/boxart/front/60245-1.jpg",
    alt: "Sonic 3 & Knuckles",
    info: "Sonic's biggest adventure yet.",
  },
];

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const gameIndex = allGames.findIndex((g) => g.id === Number(id));
  const game = allGames[gameIndex];

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [headerDialogOpen, setHeaderDialogOpen] = useState(false);
  const [editedInfo, setEditedInfo] = useState(game?.info || "");
  const [header, setHeader] = useState("");

  // Ref for the scrollable container
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever header or paragraph changes
  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop =
        scrollableContainerRef.current.scrollHeight;
    }
  }, [header, editedInfo]);

  if (!game) {
    return (
      <Container>
        <Typography variant="h4">Game Not Found</Typography>
      </Container>
    );
  }

  const handleEditClick = () => {
    if (!user) {
      setLoginDialogOpen(true); // Open login dialog if the user is not logged in
    } else {
      setEditDialogOpen(true); // Open edit dialog if the user is logged in
    }
  };

  const handleAddHeaderClick = () => {
    if (!user) {
      setLoginDialogOpen(true); // Open login dialog if the user is not logged in
    } else {
      setHeaderDialogOpen(true); // Open header dialog if the user is logged in
    }
  };

  const handleSaveHeader = () => {
    setHeaderDialogOpen(false);
  };

  const handleSave = () => {
    if (gameIndex !== -1) {
      allGames[gameIndex].info = editedInfo; // Update the game info in the array
    }
    setEditDialogOpen(false);
  };

  const handleCloseLoginDialog = () => {
    setLoginDialogOpen(false);
  };

  return (
    <div
      className="scrollable-container"
      ref={scrollableContainerRef} // Attach the ref to the container
    >
      <Container>
        <Typography variant="h4">{game.alt}</Typography>
        <img src={game.src} alt={game.alt} className="game-image" />
        {header && <Typography variant="h5">{header}</Typography>}
        <Typography>{game.info}</Typography>
        <Button variant="contained" color="primary" onClick={handleEditClick}>
          Edit Game Info
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddHeaderClick}
          style={{ marginLeft: "10px" }}
        >
          Add Header
        </Button>
      </Container>

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

      {/* Add Header Dialog */}
      <Dialog open={headerDialogOpen} onClose={() => setHeaderDialogOpen(false)}>
        <DialogTitle>Add Header</DialogTitle>
        <DialogContent>
          <TextField
            label="Header"
            fullWidth
            margin="normal"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHeaderDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveHeader} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Login Prompt Dialog */}
      <Dialog open={loginDialogOpen} onClose={handleCloseLoginDialog}>
        <DialogTitle>You must sign in</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You must sign in to add a header or edit the game info.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button component={Link} to="/login" onClick={handleCloseLoginDialog}>
            Login
          </Button>
          <Button component={Link} to="/signup" onClick={handleCloseLoginDialog}>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GameDetails;