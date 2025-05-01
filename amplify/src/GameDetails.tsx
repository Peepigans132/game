import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
import "../src/App.css"; // Import your CSS file

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
];

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = allGames.find((g) => g.id === Number(id));

  const [header, setHeader] = useState("");
  const [paragraph, setParagraph] = useState(game?.info || "");
  const [headerDialogOpen, setHeaderDialogOpen] = useState(false);
  const [paragraphDialogOpen, setParagraphDialogOpen] = useState(false);

  if (!game) {
    return (
      <Container>
        <Typography variant="h4">Game Not Found</Typography>
      </Container>
    );
  }

  const handleAddHeader = () => {
    setHeaderDialogOpen(true);
  };

  const handleAddParagraph = () => {
    setParagraphDialogOpen(true);
  };

  const handleSaveHeader = () => {
    setHeaderDialogOpen(false);
  };

  const handleSaveParagraph = () => {
    setParagraphDialogOpen(false);
  };

  return (
    <div className="scrollable-container">
      <Container>
        <Typography variant="h4">{game.alt}</Typography>
        <img src={game.src} alt={game.alt} className="game-image" />
        {header && <Typography variant="h5">{header}</Typography>}
        <Typography>{paragraph}</Typography>
        <Button variant="contained" color="primary" onClick={handleAddHeader}>
          Add Header
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddParagraph}
          style={{ marginLeft: "10px" }}
        >
          Add Paragraph
        </Button>
      </Container>

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

      {/* Add Paragraph Dialog */}
      <Dialog
        open={paragraphDialogOpen}
        onClose={() => setParagraphDialogOpen(false)}
      >
        <DialogTitle>Add Paragraph</DialogTitle>
        <DialogContent>
          <TextField
            label="Paragraph"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setParagraphDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveParagraph} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GameDetails;