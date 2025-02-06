import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const Topbar: React.FC = () => {
  const { t: translate, i18n } = useTranslation();
  return (
    <AppBar
      position="static"
      sx={{
        background: "#d81b60",
        height: "8px",
        display: "flex",
        justifyContent: "center",
        padding: "0",
        position: "relative",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "8px",
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "10px",
        }}
      >
        <Box
          sx={{
            background: "#d81b60",
            padding: "5px 10px",
            borderRadius: "16px",
            height: "24px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "white", fontSize: "12px" }}>
            {translate("Logged")}{" "}
            <strong>{localStorage.getItem("user_name")}</strong>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
