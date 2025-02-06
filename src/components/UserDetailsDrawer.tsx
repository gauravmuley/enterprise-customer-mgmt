import React from "react";
import {
  Drawer,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface UserDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    department: string;
    language: string;
    localNr?: string;
    landline?: string;
    mobile?: string;
  } | null;
  editMode?: boolean;
  onFieldChange?: (field: string, value: string) => void;
  onSave?: () => void;
}

const UserDetailsDrawer: React.FC<UserDetailsDrawerProps> = ({
  open,
  onClose,
  user,
  editMode = false,
  onFieldChange,
  onSave,
}) => {
  if (!user) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: 2 }}>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
        <Typography variant="h6">
          {editMode ? "Edit User Details" : user.name}
        </Typography>

        <Box sx={{ marginY: 2 }}>
          {Object.keys(user).map((field) => (
            <TextField
              key={field}
              fullWidth
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={user[field as keyof typeof user] || ""}
              disabled={!editMode}
              onChange={(e) =>
                editMode && onFieldChange
                  ? onFieldChange(field, e.target.value)
                  : undefined
              }
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Box>

        {editMode && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSave}
          >
            Save
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

export default UserDetailsDrawer;
