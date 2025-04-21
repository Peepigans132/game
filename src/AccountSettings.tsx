import React, { useState } from "react";
import { useAuth } from "../src/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const AccountSettings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  if (!user) {
    return (
      <Container>
        <Typography variant="h5">You are not logged in.</Typography>
      </Container>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the home page after logout
  };

  const handleChangePassword = () => {
    // Logic to change the password (e.g., API call)
    setChangePasswordOpen(false); // Close the dialog after saving
  };

  return (
    <Container>
      <Typography variant="h4">Account Settings</Typography>
      <Typography variant="h6">Username: {user.username}</Typography>
      <Typography variant="h6">Verified: {user.isVerified ? "Yes" : "No"}</Typography>

      <List>
        <ListItem component="button" onClick={() => setChangePasswordOpen(true)}>
          <ListItemText primary="Change Password" />
        </ListItem>
        <ListItem component="button">
          <ListItemText primary="Update Email" />
        </ListItem>
        <ListItem component="button" onClick={handleLogout}>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>

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
    </Container>
  );
};

export default AccountSettings;