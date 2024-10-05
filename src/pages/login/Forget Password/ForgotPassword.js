import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogContent,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailTooltipOpen, setEmailTooltipOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State for popup

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const emailPattern = /^[a-zA-Z0-9]{3,}@gmail\.com$/;
    const isValid = emailPattern.test(newEmail);
    setEmailError(!isValid);

    setEmailTooltipOpen(!isValid && newEmail.length > 0);
  };

  const handleEmailFocus = () => {
    const emailPattern = /^[a-zA-Z0-9]{3,}@gmail\.com$/;
    const isValid = emailPattern.test(email);
    setEmailTooltipOpen(!isValid);
  };

  const handleEmailBlur = () => {
    setEmailTooltipOpen(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setDialogOpen(true); // Open the popup when the form is submitted

    // Simulate a waiting period (for example, after an API call)
    setTimeout(() => {
      setDialogOpen(false); // Close the popup after 3 seconds
    }, 5000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxShadow: "0 0 10px rgba(34, 31, 31, 0.3)",
      }}
    >
      <Typography
        variant="h5"
        sx={{ margin: "5px 0", color: "#293241", fontWeight: "bold" }}
      >
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Email field */}
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <TextField
            placeholder="Email"
            type="email"
            required
            error={emailError}
            value={email}
            onChange={handleEmailChange}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
                width: "320px",
                height: "37px",
                margin: "10px 0",
                border: "1px solid gray",
                "& fieldset": {
                  border: "none",
                },
              },
              "& .MuiInputBase-root": {
                "&.Mui-focused": {
                  borderColor: "gray",
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
            placement="right-end"
            open={emailTooltipOpen}
            arrow
            PopperProps={{
              sx: {
                "& .MuiTooltip-tooltip": {
                  backgroundColor: "#f5f5f5",
                  color: "#ee6c4d",
                  textTransform: "bold",
                  fontSize: 13,
                },
              },
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [40, 0],
                  },
                },
              ],
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#ee6c4d",
            color: "#fff",
            fontSize: "12px",
            padding: "10px 45px",
            borderRadius: "8px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 10px rgba(34, 31, 31, 0.3)",
            transition: "0.5s ease",
            "&:hover": {
              backgroundColor: "#ee5c3d",
            },
          }}
        >
          Send Reset Link
        </Button>
      </form>

     {/* Popup Dialog */}
<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
  <DialogContent
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}
  >
    <Typography
      variant="body1"
      sx={{
        color: "#293241",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 10px rgba(34, 31, 31, 0.3)",
        backgroundColor: "#f7f7f7",
        borderRadius: "12px",
        padding: "20px",
        width: "320px",
        height: "140px",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      Please wait while we process your request...
      <span
        style={{
          color: "#ee6c4d",
          fontSize: "14px",
          marginTop: "10px",
        }}
      >
        Check your email for further instructions.
      </span>
    </Typography>
  </DialogContent>
</Dialog>

    </Box>
  );
};

export default ForgotPassword;
