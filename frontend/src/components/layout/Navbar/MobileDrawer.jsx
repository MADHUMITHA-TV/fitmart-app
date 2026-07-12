import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenter";

const pages = [
  {
    name: "Home",
    path: "/",
    icon: <HomeRoundedIcon />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <StorefrontRoundedIcon />,
  },
  {
    name: "About",
    path: "/about",
    icon: <InfoRoundedIcon />,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: <ContactMailRoundedIcon />,
  },
];

function MobileDrawer({
  open,
  onClose,
  navigate,
}) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
        },
      }}
    >
      {/* Header */}

      <Box
        sx={{
          background:
            "linear-gradient(135deg,#2563EB,#38BDF8)",
          color: "#fff",
          p: 3,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,.2)",
              }}
            >
              <FitnessCenterRoundedIcon />
            </Avatar>

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                FitMart
              </Typography>

              <Typography
                variant="body2"
                sx={{ opacity: .85 }}
              >
                Fitness Store
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{ color: "#fff" }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      {/* Menu */}

      <List sx={{ p: 2 }}>

        {pages.map((page) => (

          <ListItem
            key={page.path}
            disablePadding
            sx={{ mb: 1 }}
          >
            <ListItemButton
              onClick={() => {
                navigate(page.path);
                onClose();
              }}
              sx={{
                borderRadius: 3,
                py: 1.4,
                transition: ".3s",

                "&:hover": {
                  bgcolor: "#EFF6FF",
                  transform: "translateX(6px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#2563EB",
                  minWidth: 40,
                }}
              >
                {page.icon}
              </ListItemIcon>

              <ListItemText
                primary={page.name}
                primaryTypographyProps={{
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          </ListItem>

        ))}

      </List>

      {/* Bottom */}

      <Box
        sx={{
          mt: "auto",
          p: 3,
          textAlign: "center",
          bgcolor: "#F8FAFC",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Train Hard. Stay Healthy.
        </Typography>
      </Box>

    </Drawer>
  );
}

export default MobileDrawer;