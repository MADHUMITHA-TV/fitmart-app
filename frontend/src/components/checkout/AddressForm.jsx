import {
  Typography,
  Grid,
  TextField,
  Paper,
  Box,
  Avatar,
  Stack,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function AddressForm({
  address,
  setAddress,
}) {
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        bgcolor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow:
          "0 10px 30px rgba(0,0,0,.05)",
      }}
    >
      {/* Header */}

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={4}
      >
        <Avatar
          sx={{
            width: 58,
            height: 58,
            bgcolor: "#EFF6FF",
            color: "#2563EB",
          }}
        >
          <LocalShippingIcon />
        </Avatar>

        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            color="#111827"
          >
            Shipping Address
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Please enter the delivery
            address for your order.
          </Typography>
        </Box>
      </Stack>

      <Grid
        container
        spacing={3}
      >
        {/* Full Name */}

        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
        </Grid>

        {/* Phone */}

        <Grid
          item
          xs={12}
          sm={6}
        >
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
        </Grid>

        {/* Address */}

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Complete Address"
            name="address"
            value={address.address}
            onChange={handleChange}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
        </Grid>
                {/* City */}

        <Grid
          item
          xs={12}
          sm={4}
        >
          <TextField
            fullWidth
            label="City"
            name="city"
            value={address.city}
            onChange={handleChange}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
        </Grid>

        {/* State */}

        <Grid
          item
          xs={12}
          sm={4}
        >
          <TextField
            fullWidth
            label="State"
            name="state"
            value={address.state}
            onChange={handleChange}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
        </Grid>

        {/* Pincode */}

        <Grid
          item
          xs={12}
          sm={4}
        >
          <TextField
            fullWidth
            label="Pincode"
            name="pincode"
            value={address.pincode}
            onChange={handleChange}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddressForm;
