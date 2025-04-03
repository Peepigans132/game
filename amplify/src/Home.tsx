import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Grid, Button } from "@mui/material";
import { useAuth } from "../components/AuthContext"; // Corrected import path

interface Image {
  id: number;
  src: string;
  alt: string;
}

const allImages: Image[] = [
  { id: 1, src: "https://example.com/image1.jpg", alt: "Game 1" },
  { id: 2, src: "https://example.com/image2.jpg", alt: "Game 2" },
  { id: 3, src: "https://example.com/image3.jpg", alt: "Game 3" },
];

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Welcome to the Gaming Encyclopedia
        </Typography>
        <Typography variant="h6" gutterBottom>
          Please <Link to="/login">log in</Link> to view the content.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.username}!
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={logout}
        style={{ marginBottom: "20px" }}
      >
        Logout
      </Button>
      <Typography variant="h6" gutterBottom>
        Featured Games
      </Typography>
      <Grid container spacing={2}>
        {allImages.map((image: Image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Link to={`/game/${image.id}`}>
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <Typography variant="subtitle1">{image.alt}</Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
