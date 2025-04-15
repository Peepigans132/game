import React from "react";
import { useAuth } from "../src/AuthContext";
import { Container, Typography,  } from "@mui/material";

const AccountSettings: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container>
        <Typography variant="h5">You are not logged in.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4">Account Settings</Typography>
      <Typography variant="h6">Username: {user.username}</Typography>
      <Typography variant="h6">Verified: {user.isVerified ? "Yes" : "No"}</Typography>
    </Container>
  );
};

export default AccountSettings;