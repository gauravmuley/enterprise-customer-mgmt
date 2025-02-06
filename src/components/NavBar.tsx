import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Switch,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

import { useTranslation } from "react-i18next";

interface Props {
  toggleDarkMode: () => void;
}

const NavBar: React.FC<Props> = ({ toggleDarkMode }) => {
  const { t: translate, i18n } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSidebarWidth(entry.contentRect.width);
      }
    });

    if (sidebarRef.current) {
      resizeObserver.observe(sidebarRef.current);
    }

    return () => {
      if (sidebarRef.current) {
        resizeObserver.unobserve(sidebarRef.current);
      }
    };
  }, []);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)", color: "black" }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <div ref={sidebarRef} style={{ display: "flex" }}></div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: `calc(100% - ${sidebarWidth}px)`,
              transition: "width 0.3s ease",
            }}
          >
            <Button color="inherit" href="/home">
              {translate("home")}
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated ? (
            <Button color="inherit" href="/login" onClick={logout}>
              {translate("logout")}
            </Button>
          ) : (
            ""
          )}
          <Switch onChange={toggleDarkMode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
