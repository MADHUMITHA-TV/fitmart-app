import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";

import { useSelector } from "react-redux";

import EditAddressDialog from "./EditAddressDialog";

import "./AddressCard.css";

function AddressCard() {
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="profile-card">

        <CardContent>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >

            <Box display="flex" alignItems="center" gap={1}>

              <HomeIcon color="primary" />

              <Typography
                variant="h5"
                fontWeight={700}
              >
                Shipping Address
              </Typography>

            </Box>

            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setOpen(true)}
            >
              Edit
            </Button>

          </Box>

          <Box className="address-box">

            <Typography fontWeight={700}>
              {user?.firstName} {user?.lastName}
            </Typography>

            <Typography mt={1}>
              {user?.address || "No Address Added"}
            </Typography>

            <Typography>
              {user?.city || "-"}, {user?.state || "-"}
            </Typography>

            <Typography>
              {user?.country || "India"} - {user?.pincode || "-"}
            </Typography>

            <Typography mt={2}>
              📞 {user?.phone || "-"}
            </Typography>

          </Box>

        </CardContent>

      </Card>

      <EditAddressDialog
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}

export default AddressCard;