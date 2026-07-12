import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import { useSelector } from "react-redux";

function EditAddressDialog({ open, handleClose }) {
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        pincode: user.pincode || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log(form);

    /*
    dispatch(updateProfile(form))
      .unwrap()
      .then(() => handleClose());
    */

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Shipping Address</DialogTitle>

      <DialogContent dividers>

        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save Changes
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default EditAddressDialog;