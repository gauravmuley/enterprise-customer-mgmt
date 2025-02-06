import React, { JSX, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material"; // Import Box
import {
  Dashboard,
  Group,
  Business,
  Menu,
  History,
  Settings,
  ListAlt,
  ViewList,
  Timer,
  Badge,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  active?: string;
  extraProps?: {
    language: string;
    setLanguage: (lang: string) => void;
  };
}

interface MenuItem {
  label: string | (() => string);
  key: string;
  icon: JSX.Element;
  path: string;
  submenu?: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      label: () => t("overview"),
      key: "Overview",
      icon: <Dashboard />,
      path: "/",
    },
    {
      label: "Users",
      key: "Users",
      icon: <Group />,
      path: "/users",
      submenu: [
        {
          label: () => t("userOverview"),
          key: "UserOverview",
          icon: <Badge />,
          path: "/user-overview",
        },
        {
          label: () => t("departments"),
          key: "Departments",
          icon: <Business />,
          path: "/departments",
        },
        {
          label: () => t("keyTemplates"),
          key: "KeyTemplates",
          icon: <ListAlt />,
          path: "/key-templates",
        },
        {
          label: () => t("orderHistory"),
          key: "OrderHistory",
          icon: <History />,
          path: "/order-history",
        },
        {
          label: () => t("multiChangeStatus"),
          key: "MultiChangeStatus",
          icon: <ViewList />,
          path: "/multi-change-status",
        },
        {
          label: () => t("timeManagement"),
          key: "TimeManagement",
          icon: <Timer />,
          path: "/time-management",
        },
        {
          label: () => t("licenses"),
          key: "Licenses",
          icon: <Badge />,
          path: "/licenses",
        },
      ],
    },
    {
      label: () => t("departments"),
      key: "Departments",
      icon: <Business />,
      path: "/departments",
    },
    {
      label: () => t("keyTemplates"),
      key: "KeyTemplates",
      icon: <ListAlt />,
      path: "/key-templates",
    },
    {
      label: () => t("orderHistory"),
      key: "OrderHistory",
      icon: <History />,
      path: "/order-history",
    },
    {
      label: "Settings",
      key: "Settings",
      icon: <Settings />,
      path: "/settings",
    },
  ];

  const activeKey =
    menuItems?.find((item) => item.path === location.pathname)?.key || "";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: submenuOpen ? 480 : open ? 240 : 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: submenuOpen ? 480 : open ? 240 : 80,
          transition: "width 0.3s ease-in-out",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "row",
        },
      }}
    >
      <div>
        <IconButton onClick={() => setOpen(!open)} sx={{ margin: 1 }}>
          <Menu />
        </IconButton>
        <List>
          {menuItems.map((item) => (
            <Tooltip
              key={item.key}
              title={
                !open
                  ? typeof item.label === "function"
                    ? item.label()
                    : item.label
                  : ""
              }
              placement="right"
              arrow
            >
              <ListItemButton
                component={item.submenu ? undefined : Link}
                to={item.submenu ? undefined : item.path}
                selected={activeKey === item.key}
                onClick={() => setSubmenuOpen(item.submenu ? item.key : null)}
                sx={{
                  backgroundColor:
                    activeKey === item.key ? "#b3d4fc" : "transparent",
                  "&.Mui-selected": {
                    backgroundColor: "#b3d4fc",
                    "&:hover": { backgroundColor: "#a2c4fb" },
                  },
                  borderRadius: "8px",
                  margin: "5px",
                  padding: open ? "10px 20px" : "10px",
                  display: "flex",
                  justifyContent: open ? "flex-start" : "center",
                }}
              >
                <Box display="flex" alignItems="center">
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={
                        typeof item.label === "function"
                          ? item.label()
                          : item.label
                      }
                    />
                  )}
                </Box>
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </div>

      {submenuOpen && (
        <div style={{ width: "240px", padding: "10px" }}>
          <IconButton onClick={() => setSubmenuOpen(null)}>
            <ArrowBack />
          </IconButton>
          <List>
            {menuItems
              .find((item) => item.key === submenuOpen)
              ?.submenu?.map((sub) => (
                <ListItemButton
                  component={Link}
                  to={sub.path}
                  key={sub.key}
                  selected={activeKey === sub.key}
                  sx={{
                    backgroundColor:
                      activeKey === sub.key ? "#b3d4fc" : "transparent",
                    "&.Mui-selected": {
                      backgroundColor: "#b3d4fc",
                      "&:hover": { backgroundColor: "#a2c4fb" },
                    },
                    borderRadius: "8px",
                    margin: "5px",
                    padding: "10px 20px",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    {" "}
                    {/* Use Box here too */}
                    <ListItemIcon>{sub.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        typeof sub.label === "function"
                          ? sub.label()
                          : sub.label
                      }
                    />
                  </Box>
                </ListItemButton>
              ))}
          </List>
        </div>
      )}
    </Drawer>
  );
};

export default Sidebar;
