import React from "react";
import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

const CreateUserButton: React.FC = () => {
  const handleClick = () => {
    alert("Create User Clicked!");
  };

  return (
    <Fab
      color="primary"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      onClick={handleClick}
    >
      <Add />
    </Fab>
  );
};

export default CreateUserButton;
