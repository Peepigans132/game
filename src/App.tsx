import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { AuthProvider, useAuth } from "../src/AuthContext"; // Use useAuth hook
import GameDetails from "../src/GameDetails";
import Login from "../src/Login";
import Signup from "../src/signup";
import AccountSettings from "../src/AccountSettings"; // Import AccountSettings
import "../src/App.css";

// Search bar styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: "auto",
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
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "20ch",
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "35ch",
      "&:focus": {
        width: "40ch",
      },
    },
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
    info: "A fast-paced action games.",


  },

  {

    
    id: 5,
    src: "https://cdn.thegamesdb.net/images/original/boxart/front/60245-1.jpg",
    alt: "Sonic 3 & Knuckles",
    info: "Sonic's biggest adventure yet."
  }
];

function SearchAppBar() {
  const { user, logout } = useAuth(); // Use useAuth hook
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    logout(); // Log the user out
    navigate("/"); // Redirect to the home page after logout
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton size="large" edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Gaming Encyclopedia
          </Typography>
        </div>
        <Search sx={{ flexGrow: 1, maxWidth: "400px" }}>
          <SearchIconWrapper>
            <MenuIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Search>
        <div>
          {user ? (
            <>
              <Button color="inherit" onClick={() => navigate("/account")}>
                Account Settings
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </div>
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
      <Container>
        <Grid container spacing={2} justifyContent="center">
          {selectedImages.map((image) => (
            <Grid key={image.id} item xs={6}>
              <a onClick={() => handleClick(image)} style={{ cursor: "pointer" }}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="game-image"
                  style={{ width: "100%", border: "none" }}
                />
              </a>
              <Typography variant="h6">{image.alt}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ClickableImages />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<AccountSettings />} /> {/* Add Account Settings route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;