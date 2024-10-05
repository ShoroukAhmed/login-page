// src/components/TopBar.js

import React, { useState } from "react";
import {
  alpha,
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  styled,
  Toolbar,
  useTheme,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MuiAppBar from "@mui/material/AppBar";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import logo from "../assests/devroots logo.png"; // Import your logo here
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TopBar = ({ open, handleDrawerOpen, setMode }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleSignInClick = () => {
    // Add any logic you need here (e.g., form validation, API call)
    navigate("/login");
  };
  // Navigate to the login page
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleTheme = () => {
    const newMode = theme.palette.mode === "light" ? "dark" : "light";
    localStorage.setItem("currentMode", newMode);
    setMode(newMode);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
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
    "& .MuiInputBase-input": {
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
    },
  }));

  return (
    <AppBar
      position="absolute"
      open={open}
      sx={{ height: "69px", zIndex: 0, backgroundColor: "#1d242f" }}
    >
      <Toolbar>
        {/* Add the logo here */}
        <img
          src={logo}
          alt="Logo"
          style={{ width: "190px", marginRight: "16px" }}
        />
        <Box display="flex" justifyContent="center" flexGrow={1}>
          <Stack direction="row" spacing={2}>
            <MenuItem sx={{ fontSize: 18 }}>
              <Link
                to="/" // Replace with your actual route
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Home
              </Link>
            </MenuItem>
            <MenuItem sx={{ fontSize: 18 }}>
              <Link
                to="/" // Replace with your actual route
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Start here
              </Link>
            </MenuItem>
            <MenuItem sx={{ fontSize: 18 }}>
              <Link
                to="/" // Replace with your actual route
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                Service
              </Link>
            </MenuItem>
            <MenuItem sx={{ fontSize: 18 }}>
              <Link
                to="/" // Replace with your actual route
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                About us
              </Link>
            </MenuItem>
          </Stack>
        </Box>
        <Box flexGrow="" />

        <IconButton onClick={handleMenuClick} color="inherit"></IconButton>

        {/* Wrap the Search and Theme toggle buttons in a Box for centering */}
        <Box display="flex" alignItems="center" flexGrow={0.03}>
          <Search
            sx={{
              borderRadius: "25px",
              width: "200px",
              height: "30px",
              backgroundColor: "#F5F5F5",
              color: "#293241",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <IconButton onClick={toggleTheme} color="inherit">
            {theme.palette.mode === "light" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
        </Box>

        <Stack direction="row">
          <Button
            type="submit"
            variant="contained"
            onClick={handleSignInClick} // Handle click event
            sx={{
              display: "flex",
              backgroundColor: "#293241",
              borderRadius: "15px 0 0 15px", // Rounded left corners
              width: "80px", // Adjust width
              textTransform: "Capitalize",
            }}
          >
            Sign in
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSignInClick} // Handle click event
            sx={{
              display: "flex",
              alignItems: "right",
              justifyContent: "center",
              backgroundColor: "#ee6c4d",
              borderRadius: "0 15px 15px 0", // Rounded right corners
              width: "85px", // Adjust width
              m: "auto",
              textTransform: "Capitalize",
            }}
          >
            Sign up
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
