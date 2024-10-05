import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Snackbar,
  Alert,
  IconButton,
  Stack,
  Typography,
  List,
  ListItem,
  Grid,
  Tooltip,
} from "@mui/material";
import logo from "../../assests/google-symbol.png"; // Import your logo here
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import "../../App.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isActive, setIsActive] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  // Username Validation
  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [usernameTooltipOpen, setUsernameTooltipOpen] = useState(false); // State for username tooltip

  const handleUsernameFocus = () => {
    setUsernameTooltipOpen(!isValidUsername); // Show tooltip if username is invalid
  };

  const handleUsernameBlur = () => {
    setUsernameTooltipOpen(false); // Hide tooltip when focus is lost
  };

  useEffect(() => {
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    setIsValidUsername(usernameRegex.test(username));
  }, [username]);

  // Email Validation
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailTooltipOpen, setEmailTooltipOpen] = useState(false); // State for email tooltip

  const handleEmailChange = (e) => {
    const newEmail = e.target.value; // Store the new email value
    setEmail(newEmail);

    // Validate email and set error state
    const emailPattern = /^[a-zA-Z0-9]{3,}@gmail\.com$/; // Simple email regex pattern
    const isValid = emailPattern.test(newEmail); // Check validity of new email
    setEmailError(!isValid);

    // Show tooltip if the email is invalid and the input is not empty
    setEmailTooltipOpen(!isValid && newEmail.length > 0);
  };

  // Show tooltip on focus; hide if valid email
  const handleEmailFocus = () => {
    const emailPattern = /^[a-zA-Z0-9]{3,}@gmail\.com$/; // Simple email regex pattern
    const isValid = emailPattern.test(email); // Check validity of the current email
    setEmailTooltipOpen(!isValid); // Show tooltip if the email is invalid
  };

  // Hide tooltip when focus is lost
  const handleEmailBlur = () => {
    setEmailTooltipOpen(false); // Hide tooltip when focus is lost
  };

  /////////////////////////////////////////////////

  //Password Validaion
  // State for passwords
  const [signInPassword, setSignInPassword] = useState(""); // Password for sign-in
  const [signUpPassword, setSignUpPassword] = useState(""); // Password for sign-up
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [ConfirmtooltipOpen, setConfirmTooltipOpen] = useState(false);

  const validations = {
    minLength: signUpPassword.length >= 8,
    hasUpperCase: /[A-Z]/.test(signUpPassword),
    hasLowerCase: /[a-z]/.test(signUpPassword),
    hasNumber: /[0-9]/.test(signUpPassword),
    hasSpecialChar: /[!@#$%^&*]/.test(signUpPassword),
    match:
      signUpPassword && confirmPassword
        ? confirmPassword === signUpPassword
        : false,
  };
  const validationCriteria = [
    { label: "At least 8 characters", valid: validations.minLength },
    { label: "At least one uppercase letter", valid: validations.hasUpperCase },
    { label: "At least one lowercase letter", valid: validations.hasLowerCase },
    { label: "At least one number", valid: validations.hasNumber },
    {
      label: "At least one special character",
      valid: validations.hasSpecialChar,
    },
    { label: "Passwords match", valid: validations.match },
  ];
  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  /////////////////////////////////////////////////

  // Show JSON data in console
  axios.interceptors.request.use((request) => {
    console.log("Starting Request", JSON.stringify(request.data, null, 2));
    return request;
  });

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
    };
    // api call
    try {
      const response = await axios.post(
        "https://careerguidance.runasp.net/Auth/SignUp",
        finalData
      );
      console.log("Submitted Data: ", response.data);
      handleClick(); // Show success Snackbar
    } catch (error) {
      console.log("Error during API call: ", error);
    }
  };
  // forget password nafigation
  const navigate = useNavigate(); // Initialize useNavigate

  ///////////////////////////////////

  const handleClick = () => {
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Continue with Google clicked");
  };

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1 style={{ color: "#293241", marginBottom: 13 }}>Create Account</h1>
          {/* Username field */}

          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            
            <TextField
              placeholder="Username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!isValidUsername} // Show error when username is invalid
              onFocus={handleUsernameFocus} // Show tooltip on focus
              onBlur={handleUsernameBlur} // Hide tooltip on blur
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  width: "320px",
                  height: "37px",
                  margin: "0", // Remove default margin from TextField
                  border: "1px solid gray",
                  "& fieldset": {
                    border: "none", // Remove the default border
                  },
                },
                "& .MuiInputBase-root": {
                  "&.Mui-focused": {
                    borderColor: "gray", // Remove focus color
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #ee6c4d",
                        borderLeft: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <PersonIcon
                        style={{
                          color: "#ee6c4d",
                          fontSize: 30,
                          marginRight: 5,
                        }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
            <Tooltip
              title={
                !isValidUsername
                  ? "Username must be 3-15 characters long and contain only letters and numbers."
                  : ""
              }
              placement="right-start" // Position tooltip to the right
              open={usernameTooltipOpen} // Control tooltip visibility for username
              arrow
              PopperProps={{
                sx: {
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: "#f5f5f5", // Set your desired background color here
                    color: "#ee6c4d", // Optional: Set text color for better visibility
                    textTransform: "bold",
                    fontSize: 13,
                  },
                },
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [3, 0], // Adjust the second value for top margin (increase as needed)
                    },
                  },
                ],
              }}
            />
          </Box>
          {/* Email field */}
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <TextField
              placeholder="Email"
              type="email"
              required
              error={emailError} // Control error state
              value={email}
              onChange={handleEmailChange}
              onFocus={handleEmailFocus} // Show tooltip on focus
              onBlur={handleEmailBlur} // Hide tooltip on blur
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  width: "320px",
                  height: "37px",
                  margin: "10px 0",
                  border: "1px solid gray",
                  "& fieldset": {
                    border: "none", // Remove the default border
                  },
                },
                "& .MuiInputBase-root": {
                  "&.Mui-focused": {
                    borderColor: "gray", // Remove focus color
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #ee6c4d",
                        borderLeft: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <EmailIcon
                        style={{
                          color: "#ee6c4d",
                          fontSize: 30,
                          marginRight: 5,
                        }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />

            <Tooltip
              title="Please enter a valid email"
              placement="right-end" // Position tooltip to the right
              open={emailTooltipOpen} // Control tooltip visibility for email
              arrow
              PopperProps={{
                sx: {
                  "& .MuiTooltip-tooltip": {
                    backgroundColor: "#f5f5f5", // Set your desired background color here
                    color: "#ee6c4d", // Optional: Set text color for better visibility
                    textTransform: "bold",
                    fontSize: 13,
                  },
                },
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [40, 0], // Adjust the second value for top margin (increase as needed)
                    },
                  },
                ],
              }}
            />
          </Box>

          {/* sign up Password field with tooltip */}
          <Tooltip
            title={
              <Box sx={{ width: 230 }}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: 13, fontWeight: "bold", color: "#293241" }}
                >
                  Password Requirements:
                </Typography>
                <List>
                  {validationCriteria.map((item, index) => (
                    <ListItem key={index} sx={{ padding: 0, margin: 0 }}>
                      <Typography
                        color={item.valid ? "green" : "red"}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "10px",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        {item.valid ? "✔" : "✖"} {item.label}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            }
            open={tooltipOpen}
            placement="right-start" // Position tooltip to the right
            arrow
            PopperProps={{
              sx: {
                "& .MuiTooltip-tooltip": {
                  backgroundColor: "#f5f5f5", // Set your desired background color here
                  color: "#293241", // Optional: Set text color for better visibility
                },
              },
            }}
          >
            <TextField
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              onFocus={() => setTooltipOpen(true)} // Show tooltip on focus
              onBlur={() => setTooltipOpen(false)} // Hide tooltip on blur
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  width: "320px",
                  height: "37px",
                  border: "1px solid gray",
                  "& fieldset": { border: "none" },
                },
                "& .MuiInputBase-root": {
                  "&.Mui-focused": { borderColor: "gray" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #ee6c4d",
                        borderLeft: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <LockIcon
                        style={{
                          color: "#ee6c4d",
                          fontSize: 30,
                          marginRight: 5,
                        }}
                      />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>

          {/* Confirm Password field with tooltip */}
          <Tooltip
            title={
              <Box sx={{ width: 230 }}>
                <Typography
                  variant="h6"
                  sx={{ fontSize: 13, fontWeight: "bold", color: "#293241" }}
                >
                  Password Requirements:
                </Typography>
                <List>
                  {validationCriteria.map((item, index) => (
                    <ListItem key={index} sx={{ padding: 0, margin: 0 }}>
                      <Typography
                        color={item.valid ? "green" : "red"}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "10px",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        {item.valid ? "✔" : "✖"} {item.label}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            }
            open={ConfirmtooltipOpen}
            arrow
            placement="right-start" // Position tooltip to the right
            PopperProps={{
              sx: {
                "& .MuiTooltip-tooltip": {
                  backgroundColor: "#f5f5f5", // Set your desired background color here
                  color: "#293241", // Optional: Set text color for better visibility
                },
              },
            }}
          >
            <TextField
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmTooltipOpen(true)} // Show tooltip on focus
              onBlur={() => setConfirmTooltipOpen(false)} // Hide tooltip on blur
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  width: "320px",
                  height: "37px",
                  margin: "10px 0",
                  border: "1px solid gray",
                  "& fieldset": { border: "none" },
                },
                "& .MuiInputBase-root": {
                  "&.Mui-focused": { borderColor: "gray" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #ee6c4d",
                        borderLeft: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        borderRadius: "10px 0 0 10px",
                      }}
                    >
                      <PasswordIcon
                        style={{
                          color: "#ee6c4d",
                          fontSize: 30,
                          marginRight: 5,
                        }}
                      />
                    </div>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleShowPassword}
                      edge="end"
                      style={{ color: "gray" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>

          <button
            type="submit"
            className="btn"
            style={{ textTransform: "capitalize" }}
          >
            Sign Up
          </button>
        </form>
        {/* end of sign up form  */}
      </div>
      <div className="form-container sign-in">
        <form>
          <h1 style={{ color: "#293241" }}>Sign In</h1>

          {/* Username or email field */}
          <TextField
            placeholder="Username or email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                width: "320px",
                height: "37px",
                margin: "15px 0",
                border: "1px solid gray",
                "& fieldset": {
                  border: "none", // Remove the default border
                },
              },
              "& .MuiInputBase-root": {
                "&.Mui-focused": {
                  borderColor: "gray", // Remove focus color
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #ee6c4d",
                      borderLeft: "none",
                      borderTop: "none",
                      borderBottom: "none",
                      borderRadius: "10px 0 0 10px",
                    }}
                  >
                    <PersonIcon
                      style={{ color: "#ee6c4d", fontSize: 30, marginRight: 5 }}
                    />
                  </div>
                </InputAdornment>
              ),
            }}
          />
          {/* Sign in Password field */}
          <TextField
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                width: "320px",
                height: "37px",
                border: "1px solid gray",
                "& fieldset": { border: "none" },
              },
              "& .MuiInputBase-root": {
                "&.Mui-focused": { borderColor: "gray" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #ee6c4d",
                      borderLeft: "none",
                      borderTop: "none",
                      borderBottom: "none",
                      borderRadius: "10px 0 0 10px",
                    }}
                  >
                    <LockIcon
                      style={{ color: "#ee6c4d", fontSize: 30, marginRight: 5 }}
                    />
                  </div>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggleShowPassword}
                    edge="end"
                    style={{ color: "gray" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/*  */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Adjust spacing between checkbox and link
              width: "80%", // Adjust width as per the layout
            }}
          >
            {/* Remember Me Checkbox */}
            <Box display="flex" alignItems="center" mt={1}>
              {" "}
              {/* Aligns the checkbox and label */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                    sx={{
                      transform: "scale(0.8)", // Adjust checkbox size
                      "&.Mui-checked": {
                        color: "#ee6c4d",
                      },
                    }}
                  />
                }
                label="Remember Me"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "13px", // Set font size for the label
                    color: "#293241", // Set label color
                    fontWeight: "bold",
                  },
                }}
              />
            </Box>

            {/* Forget Your Password Link */}
            <Link
              to="/ForgotPassword" // Replace with your actual route
              style={{
                textDecoration: "none",
                color: "#293241",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              Forget Your Password?
            </Link>
          </Box>

          <button
            type="submit"
            className="btn"
            style={{ textTransform: "capitalize" }}
          >
            Sign In
          </button>

          {/* Continue with Google button */}

          <Stack
            display="flex"
            alignItems="center"
            justifyContent="center"
            direction="row"
          >
            <div
              style={{
                border: "1px solid rgba(34, 60, 84, 0.397)",
                width: 150,
                margin: 10,
              }}
            ></div>
            <span style={{ color: "#293241", fontWeight: "bold" }}> OR </span>
            <div
              style={{
                border: "1px solid rgba(34, 60, 84, 0.397)",
                width: 150,
                margin: 10,
              }}
            ></div>
          </Stack>

          <Button
            className="btn"
            style={{ backgroundColor: "#f5f5f5" }}
            variant="outlined"
            onClick={handleGoogleLogin} // Add functionality to handle Google login
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "18px", marginRight: 10 }}
            />

            <span
              style={{
                color: "#293241",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              Continue with Google
            </span>
          </Button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Friend!</h1>
            <p>
              You have an account ? <br />
              Enter your personal details to use all of the site features
            </p>
            <button
              className="hidden btn"
              id="login"
              onClick={handleLoginClick}
              style={{ textTransform: "capitalize" }}
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>
              Don't have an account ? <br />
              Register with your personal details to use all of the site
              features
            </p>
            <button
              className="hidden btn"
              id="register"
              onClick={handleRegisterClick}
              style={{ textTransform: "capitalize" }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Account created successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
