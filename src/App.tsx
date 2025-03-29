import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import "./App.css";

// Search bar styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}));

const Container = styled(Paper)(({ theme }) => ({
  maxWidth: "800px",
  margin: "20px auto",
  padding: theme.spacing(3),
  border: "3px solid black",
}));

interface Image {
  id: number;
  src: string;
  alt: string;
  info: string;
}

const allImages: Image[] = [
  { id: 1, src: "https://m.media-amazon.com/images/I/614zA+E6wvL._AC_UF1000,1000_QL80_.jpg", alt: "Donkey Kong Country 2", info: "A classic platformer game." },
  { id: 2, src: "https://upload.wikimedia.org/wikipedia/en/3/32/Super_Mario_World_Coverart.png", alt: "Super Mario World", info: "A legendary Mario adventure." },
  { id: 3, src: "https://www.vgmpf.com/Wiki/images/2/2c/Legend_of_Zelda_-_NES_-_Album_Art.jpg", alt: "The Legend of Zelda", info: "An epic action-adventure game." },
  { id: 4, src: "https://upload.wikimedia.org/wikipedia/en/f/f1/Mega_Man_X_Coverart.png", alt: "Mega Man X", info: "A fast-paced action game." },
];

const currentUser = { username: "exampleUser", role: "superuser" };

function SearchAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Gaming Encyclopedia</Typography>
        <Search>
          <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
          <StyledInputBase placeholder="Search…" />
        </Search>
      </Toolbar>
    </AppBar>
  );
}

function ClickableImages(): JSX.Element {
  const navigate = useNavigate();

  const selectedImages = React.useMemo(() => {
    const shuffled = allImages.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }, []);

  const handleClick = (image: Image) => {
    navigate(`/game/${image.id}`);
  };

  return (
    <div className="main-container">
      <SearchAppBar />
      <h1>Gaming Encyclopedia</h1>
      <p>Click an image for info.</p>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          {selectedImages.map((image) => (
            <Grid key={image.id} item xs={6}>
              <a onClick={() => handleClick(image)} style={{ cursor: "pointer" }}>
                <img src={image.src} alt={image.alt} className="game-image" style={{ width: "100%" }} />
              </a>
              <Typography variant="h6">{image.alt}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

function GameDetails() {
  const { id } = useParams<{ id: string }>();
  const image = allImages.find((img) => img.id === Number(id));
  const [open, setOpen] = useState(false);
  const [editedImage, setEditedImage] = useState(image);

  if (!image) return <Container><h2>Game Not Found</h2></Container>;

  return (
    <Container>
      <h1>{image.alt}</h1>
      <img src={image.src} alt={image.alt} style={{ maxWidth: "100%" }} />
      <Typography>{image.info}</Typography>
      {currentUser.role === "superuser" && (
        <Button variant="contained" onClick={() => setOpen(true)}>Edit</Button>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Game Info</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth value={editedImage?.alt || ""} onChange={(e) => setEditedImage({ ...editedImage!, alt: e.target.value })} />
          <TextField label="Image URL" fullWidth value={editedImage?.src || ""} onChange={(e) => setEditedImage({ ...editedImage!, src: e.target.value })} />
          <TextField label="Info" fullWidth value={editedImage?.info || ""} onChange={(e) => setEditedImage({ ...editedImage!, info: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClickableImages />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
