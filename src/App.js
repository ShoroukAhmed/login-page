// src/App.js

import React from "react";
import Login from "./pages/login/Login";
import TopBar from "./components/TopBar";
import ForgotPassword from "./pages/login/Forget Password/ForgotPassword"; 
// import SetNewPassword from "./pages/login/Forget Password/setNewPassword";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { getDesignTokens } from "Themes";

  
function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [mode, setMode] = React.useState(localStorage.getItem("currentMode") || "light");
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <Router>
              <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} />
              {/* The TopBar will be visible on all pages */}
      <Routes>
      <Route path="/login" element={<Login />} /> {/* Main login page */}
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        {/* <Route path="/SetNewPassword" element={<SetNewPassword />}/> */}


      </Routes>
      {/* <Footer /> if you have a Footer, you can include it here */}
    </Router>
  );
}
export default App;
