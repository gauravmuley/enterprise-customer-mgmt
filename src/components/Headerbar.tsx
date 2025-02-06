import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import { useTranslation } from "react-i18next";

const Headerbar = () => {
  const { t: translate, i18n } = useTranslation();
  return (
    <AppBar
      position="static"
      sx={{
        background: "white",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        padding: "0",
        position: "relative",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ color: "#333", fontWeight: "bold" }}>
            {translate("Company")}
          </Typography>
        </Box>

        <TextField
          placeholder={translate("Searchdata")}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            width: "400px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton>
            <Badge badgeContent={1} color="error">
              <MailIcon sx={{ color: "#555" }} />
            </Badge>
          </IconButton>

          <Box
            sx={{
              background: "#eee",
              padding: "4px 4px",
              borderRadius: "80px",
              height: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SettingsIcon sx={{ color: "#555" }} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Headerbar;
