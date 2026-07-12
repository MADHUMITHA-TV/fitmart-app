import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import SecurityIcon from "@mui/icons-material/Security";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AddressForm from "../../components/checkout/AddressForm";
import PaymentSection from "../../components/checkout/PaymentSection";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";

import { placeOrder } from "../../redux/slices/orderSlice";
import { fetchCart } from "../../redux/slices/cartSlice";

import "./Checkout.css";

const steps = ["Cart", "Checkout", "Complete"];

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.orders);

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash On Delivery"
  );

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handlePlaceOrder = async () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      toast.error("Please fill all address fields");
      return;
    }

    const shippingAddress = `
${address.fullName}
${address.phone}

${address.address}

${address.city}

${address.state} - ${address.pincode}
`;

    try {
      await dispatch(
        placeOrder({
          shippingAddress,
          paymentMethod,
          notes: "",
        })
      ).unwrap();

      toast.success("Order placed successfully!");

      dispatch(fetchCart());

      navigate("/orders");
    } catch (err) {
      toast.error(err || "Failed to place order");
    }
  };

  if (!cart) {
    return (
      <Container sx={{ mt: 15 }}>
        <Typography variant="h5">
          Your cart is empty.
        </Typography>
      </Container>
    );
  }

  return (
    <Box className="checkout-page">
      <Container maxWidth="xl">

        {/* Stepper */}

        <Stepper
          activeStep={1}
          alternativeLabel
          sx={{ mb: 5 }}
        >
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Heading */}

        <Box mb={5}>

          <Typography
            variant="h3"
            fontWeight={800}
          >
            Checkout
          </Typography>

          <Typography
            color="text.secondary"
            mt={1}
          >
            Complete your purchase by filling your shipping
            details and selecting a payment method.
          </Typography>

        </Box>

        <Grid container spacing={4}>

          {/* Left Side */}

          <Grid item xs={12} lg={8}>

            {/* Address */}

            <Paper className="checkout-card">

              <Box
                display="flex"
                alignItems="center"
                mb={4}
              >

        
              </Box>

              <AddressForm
                address={address}
                setAddress={setAddress}
              />

            </Paper>

            {/* Payment */}

            <Paper
              className="checkout-card"
              sx={{ mt: 4 }}
            >

              <Box
                display="flex"
                alignItems="center"
                mb={4}
              >

                <Box className="checkout-icon">

                  <PaymentsIcon color="primary" />

                </Box>

                <Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Payment Method
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Select your preferred payment option
                  </Typography>

                </Box>

              </Box>

              <PaymentSection
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />

            </Paper>

          </Grid>

          {/* Right Side */}

          <Grid item xs={12} lg={4}>

            <Box
              sx={{
                position: {
                  lg: "sticky",
                },
                top: 100,
              }}
            >

              <CheckoutSummary cart={cart} />

              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={handlePlaceOrder}
                disabled={loading}
                className="place-order-btn"
              >
                {loading
                  ? "Placing Order..."
                  : "Place Order"}
              </Button>

              {/* Trust Card */}

              <Paper className="trust-card">

                <SecurityIcon color="success" />

                <Box>

                  <Typography fontWeight={600}>
                    Secure Checkout
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    All payments are protected using secure
                    encryption.
                  </Typography>

                </Box>

              </Paper>

            </Box>

          </Grid>

        </Grid>

      </Container>
    </Box>
  );
}