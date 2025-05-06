import React, { useState } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AccountSettings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Hook for navigation
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [updateEmailOpen, setUpdateEmailOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user?.email || ""); // Default to the user's current email
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    logout(); // Log the user out
    setSuccessMessage("You have been logged out.");
    navigate("/"); // Redirect to the main page
  };

  const handleChangePassword = () => {
    if (newPassword.length >= 6) {
      setSuccessMessage("Password successfully changed!");
      setChangePasswordOpen(false);
      setNewPassword("");
    } else {
      setSuccessMessage("Password must be at least 6 characters long.");
    }
  };

  const handleUpdateEmail = () => {
    if (newEmail.includes("@")) {
      setSuccessMessage("Email successfully updated!");
      setUpdateEmailOpen(false);
    } else {
      setSuccessMessage("Please enter a valid email address.");
    }
  };

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
        }}
      >
        <Typography variant="h4" gutterBottom>
          Account Settings
        </Typography>
        {successMessage && <Typography color="primary">{successMessage}</Typography>}
        <List>
          <ListItem component="button" onClick={() => setChangePasswordOpen(true)}>
            <ListItemText primary="Change Password" />
          </ListItem>
          <ListItem component="button" onClick={() => setUpdateEmailOpen(true)}>
            <ListItemText primary="Update Email" />
          </ListItem>
          <ListItem component="button" onClick={handleLogout}>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Paper>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleChangePassword} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Email Dialog */}
      <Dialog open={updateEmailOpen} onClose={() => setUpdateEmailOpen(false)}>
        <DialogTitle>Update Email</DialogTitle>
        <DialogContent>
          <TextField
            label="New Email"
            type="email"
            fullWidth
            margin="normal"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateEmailOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateEmail} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AccountSettings;