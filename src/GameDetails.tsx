import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Container } from "@mui/material";

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Game Details for ID: {id}
      </Typography>
      <Typography variant="body1">
        This is where detailed information about the game will be displayed.
      </Typography>
    </Container>
  );
};

export default GameDetails;