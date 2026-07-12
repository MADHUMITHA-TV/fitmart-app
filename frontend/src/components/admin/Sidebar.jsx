import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menu = [
    {
      title: "Dashboard",
      icon: <DashboardRoundedIcon />,
      path: "/admin/dashboard",
    },
    {
      title: "Orders",
      icon: <ShoppingBagRoundedIcon />,
      path: "/admin/orders",
    },
    {
      title: "Users",
      icon: <PeopleRoundedIcon />,
      path: "/admin/users",
    },
    {
      title: "Products",
      icon: <Inventory2RoundedIcon />,
      path: "/admin/products",
    },
  ];

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background:
          "linear-gradient(180deg,#111827 0%,#1e293b 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        boxShadow: "8px 0 30px rgba(0,0,0,.15)",
      }}
    >
      {/* Logo */}

      <Box
        sx={{
          p: 4,
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: 3,
              background:
                "linear-gradient(135deg,#6366f1,#06b6d4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StorefrontRoundedIcon
              sx={{ fontSize: 30 }}
            />
          </Box>

          <Box>
            <Typography
              fontWeight={700}
              fontSize={22}
            >
              FitMart
            </Typography>

            <Typography
              color="#94a3b8"
              fontSize={13}
            >
              Admin Dashboard
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Menu */}

      <List sx={{ mt: 3, px: 2 }}>
        {menu.map((item) => {
          const active =
            location.pathname === item.path;

          return (
            <ListItem
              disablePadding
              key={item.title}
              sx={{ mb: 1 }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 3,
                  py: 1.3,
                  background: active
                    ? "linear-gradient(90deg,#4f46e5,#2563eb)"
                    : "transparent",

                  "&:hover": {
                    background:
                      "rgba(255,255,255,.08)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 42,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.title}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider
        sx={{
          bgcolor: "rgba(255,255,255,.1)",
        }}
      />

      <List sx={{ p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 3,
              color: "#ef4444",

              "&:hover": {
                bgcolor:
                  "rgba(239,68,68,.12)",
              },
            }}
          >
            <ListItemIcon
              sx={{ color: "#ef4444" }}
            >
              <LogoutRoundedIcon />
            </ListItemIcon>

            <ListItemText
              primary="Logout"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}