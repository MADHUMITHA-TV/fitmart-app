import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Typography,
  Chip,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditIcon from "@mui/icons-material/Edit";

import { useSelector } from "react-redux";
import EditProfileDialog from "./EditProfileDialog";
import "./ProfileHeader.css";

function ProfileHeader() {
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="profile-header">

        {/* Cover Image */}

        <Box className="profile-cover" />

        {/* Content */}

        <Box className="profile-content">

          <Avatar
            src={user?.profileImage}
            className="profile-avatar"
          >
            {user?.firstName?.charAt(0)}
          </Avatar>

          <Box flex={1}>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              {user?.firstName} {user?.lastName}
            </Typography>

            <Chip
              label="Premium Member"
              color="primary"
              size="small"
              sx={{ mt: 1 }}
            />

            <Box className="profile-info">

              <Box className="info-row">
                <EmailOutlinedIcon fontSize="small" />
                <Typography>
                  {user?.email || "-"}
                </Typography>
              </Box>

              <Box className="info-row">
                <PhoneOutlinedIcon fontSize="small" />
                <Typography>
                  {user?.phone || "-"}
                </Typography>
              </Box>

              <Box className="info-row">
                <CalendarMonthOutlinedIcon fontSize="small" />
                <Typography>
                  Joined{" "}
                  {user?.createdAt
                    ? user.createdAt.substring(0, 10)
                    : "-"}
                </Typography>
              </Box>

            </Box>

          </Box>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setOpen(true)}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              px: 3,
              height: "45px",
            }}
          >
            Edit Profile
          </Button>

        </Box>

      </Card>

      <EditProfileDialog
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}

export default ProfileHeader;