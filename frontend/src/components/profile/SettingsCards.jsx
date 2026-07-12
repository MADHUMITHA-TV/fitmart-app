import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/slices/authSlice";

import "./SettingsCards.css";

function SettingsCards() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const settings = [

    {
      title: "Change Password",
      subtitle: "Update your password",
      icon: <LockOutlinedIcon />,
      action: () => navigate("/change-password"),
    },

    {
      title: "Manage Addresses",
      subtitle: "Shipping & Billing",
      icon: <HomeOutlinedIcon />,
      action: () => navigate("/addresses"),
    },

    {
      title: "Notifications",
      subtitle: "Email & Push Notifications",
      icon: <NotificationsOutlinedIcon />,
      action: () => {},
    },

    {
      title: "Privacy & Security",
      subtitle: "Manage account security",
      icon: <SecurityOutlinedIcon />,
      action: () => {},
    },

    {
      title: "Help & Support",
      subtitle: "Contact FitMart",
      icon: <HelpOutlineOutlinedIcon />,
      action: () => navigate("/contact"),
    },

    {
      title: "Logout",
      subtitle: "Sign out",
      icon: <LogoutOutlinedIcon color="error" />,
      action: () => {
        dispatch(logout());
        navigate("/login");
      },
    },

  ];

  return (

    <Card className="settings-card">

      <CardContent>

        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Account Settings
        </Typography>

        <List>

          {settings.map((item, index) => (

            <Box key={item.title}>

              <ListItemButton
                className="setting-item"
                onClick={item.action}
              >

                <ListItemIcon>

                  {item.icon}

                </ListItemIcon>

                <ListItemText
                  primary={item.title}
                  secondary={item.subtitle}
                />

                <ChevronRightIcon />

              </ListItemButton>

              {index !== settings.length - 1 &&
                <Divider />}

            </Box>

          ))}

        </List>

      </CardContent>

    </Card>

  );

}

export default SettingsCards;