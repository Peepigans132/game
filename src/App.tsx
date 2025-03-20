import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`, // ✅ Fixed paddingLeft
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function SearchAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Platformers</MenuItem>
            <MenuItem onClick={handleClose}>Fighting</MenuItem>
            <MenuItem onClick={handleClose}>RPG</MenuItem>
            <MenuItem onClick={handleClose}>Shooter</MenuItem>
            <MenuItem onClick={handleClose}>Puzzle</MenuItem>
          </Menu>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Gaming Encyclopedia
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

interface Image {
  id: number;
  src: string;
  alt: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ClickableImages(): JSX.Element {
  const navigate = useNavigate();

  const allImages: Image[] = [
    { id: 1, src: "https://m.media-amazon.com/images/I/614zA+E6wvL._AC_UF1000,1000_QL80_.jpg", alt: "Donkey Kong Country 2" },
    { id: 2, src: "https://upload.wikimedia.org/wikipedia/en/3/32/Super_Mario_World_Coverart.png", alt: "Super Mario World" },
    { id: 3, src: "https://via.placeholder.com/150", alt: "The Legend of Zelda" },
    { id: 4, src: "https://upload.wikimedia.org/wikipedia/en/f/f1/Mega_Man_X_Coverart.png", alt: "Mega Man X" },
  ];

  const getRandomGames = () => allImages.sort(() => 0.5 - Math.random()).slice(0, 2);
  const [images] = useState<Image[]>(getRandomGames());

  const handleClick = (image: Image) => {
    navigate(`/game/${image.id}`, { state: { game: image } });
  };

  return (
    <div className="bg-green-500 min-h-screen flex flex-col items-center p-6">
      <SearchAppBar />
      <h1 className="text-4xl font-bold text-white">Gaming Encyclopedia</h1>
      <p className="text-lg text-center mb-6 text-white">Click an image for info.</p>
      <Grid container spacing={2} justifyContent="center">
        {images.map((image) => (
          <Grid key={image.id} item xs={6} textAlign="center">
            <Item onClick={() => handleClick(image)} style={{ cursor: "pointer" }}>
              <img src={image.src} alt={image.alt} className="rounded-lg shadow-lg hover:scale-105 transition-transform w-full" />
              <Typography variant="h6">{image.alt}</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function GameDetails() {
  const location = useLocation();
  const game = location.state?.game;

  if (!game) {
    return (
      <div className="bg-green-500 min-h-screen flex flex-col items-center p-6">
        <SearchAppBar />
        <h1 className="text-4xl font-bold text-white">Game not found</h1>
        <Link to="/" className="text-blue-300 underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-green-500 min-h-screen flex flex-col items-center p-6">
      <SearchAppBar />
      <h1 className="text-4xl font-bold text-white">{game.alt}</h1>
      <img src={game.src} alt={game.alt} className="rounded-lg shadow-lg w-1/2" />
      <p className="text-white">More details coming soon!</p>
      <Link to="/" className="text-blue-300 underline">Back to Home</Link>
    </div>
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
