import React, { useState } from "react";
import {
Box,
TextField, 
Button,
Typography,
Dialog,
DialogContent,
InputAdornment,
} from "@mui/material"; 
import LockIcon from "@mui/icons-material/Lock";
 
const SetNewPassword = () => {
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [passwordError, setPasswordError] = useState(false);
const [confirmPasswordError, setConfirmPasswordError] = useState(false);
const [dialogOpen, setDialogOpen] = useState(false);

// Password validation function
const validatePassword = (password) => {
    const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
};

const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(!validatePassword(newPassword));
};

const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError(newConfirmPassword !== password);
};

const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordError && !confirmPasswordError && password === confirmPassword) {
    setDialogOpen(true);
    
    setTimeout(() => {
        setDialogOpen(false); // Close popup after 3 seconds
    }, 3000);
    }
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
        Set New Password
    </Typography>
    <form onSubmit={handleSubmit}>
        {/* Password field */}
        <TextField
        placeholder="New Password"
        type="password"
        required
        error={passwordError}
        value={password}
        onChange={handlePasswordChange}
        helperText="Password must be at least 8 characters, contain an uppercase, lowercase, number, and special character."
        sx={{
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
            borderRadius: "25px",
            width: "320px",
            height: "40px",
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
                <LockIcon sx={{ color: "#ee6c4d", fontSize: 30 }} />
            </InputAdornment>
            ),
        }}
        />

        {/* Confirm Password field */}
        <TextField
        placeholder="Confirm Password"
        type="password"
        required
        error={confirmPasswordError}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        helperText={
            confirmPasswordError ? "Passwords do not match" : ""
        }
        sx={{
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
            borderRadius: "25px",
            width: "320px",
            height: "40px",
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
                <LockIcon sx={{ color: "#ee6c4d", fontSize: 30 }} />
            </InputAdornment>
            ),
        }}
        />

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
        Set Password
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
            Password successfully updated!
        </Typography>
        </DialogContent>
    </Dialog>
    </Box>
);
};

export default SetNewPassword;
