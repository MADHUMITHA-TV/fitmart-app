import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Badge,
  Paper,
  InputBase,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import { useSelector } from "react-redux";

export default function Topbar() {
  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        width: "calc(100% - 280px)",
        ml: "280px",
        bgcolor: "rgba(255,255,255,.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #eee",
        color: "#111827",
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        

        {/* Search */}

        

        <Box sx={{ flexGrow: 1 }} />

        

        
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Box textAlign="right">
            <Typography
              fontWeight={700}
            >
              {user?.firstName}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Administrator
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: "#6366f1",
              width: 46,
              height: 46,
              fontWeight: 700,
            }}
          >
            {user?.firstName?.charAt(0)}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}