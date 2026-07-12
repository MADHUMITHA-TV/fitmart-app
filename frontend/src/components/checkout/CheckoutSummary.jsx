import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

function CheckoutSummary({ cart }) {
  if (!cart) return null;

  const subtotal = cart.grandTotal;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 5,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        boxShadow: "0 20px 45px rgba(15,23,42,.08)",
        background: "#fff",
      }}
    >
      {/* Header */}

      <Box
        sx={{
          background:
            "linear-gradient(135deg,#2563EB,#1D4ED8)",
          color: "#fff",
          px: 3,
          py: 3,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,.18)",
            }}
          >
            <ShoppingBagOutlinedIcon />
          </Avatar>

          <Box flex={1}>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              Order Summary
            </Typography>

            <Typography
              sx={{
                opacity: .9,
                fontSize: 14,
              }}
            >
              {cart.totalItems} item(s) in your cart
            </Typography>
          </Box>
        </Stack>
      </Box>

      <CardContent sx={{ p: 3 }}>

        <Stack spacing={3}>

          {/* Price Section */}

          <Typography
            fontWeight={700}
            variant="h6"
          >
            Price Details
          </Typography>

          <Stack spacing={2}>

            <Box
              display="flex"
              justifyContent="space-between"
            >
              <Typography color="text.secondary">
                Subtotal
              </Typography>

              <Typography fontWeight={600}>
                ₹{subtotal.toLocaleString()}
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
            >
              <Typography color="text.secondary">
                Discount
              </Typography>

              <Typography
                color="success.main"
                fontWeight={700}
              >
                − ₹0
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography color="text.secondary">
                Shipping
              </Typography>

              <Chip
                label="FREE"
                color="success"
                size="small"
                sx={{
                  fontWeight: 700,
                }}
              />
            </Box>

          </Stack>

          <Divider />

          {/* Total */}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>

              <Typography
                variant="h6"
                fontWeight={700}
              >
                Total
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Inclusive of GST
              </Typography>

            </Box>

            <Typography
              variant="h4"
              fontWeight={800}
              color="primary"
            >
              ₹{subtotal.toLocaleString()}
            </Typography>
          </Box>

          {/* Offer */}

          <Chip
            icon={<DiscountOutlinedIcon />}
            label="Free Shipping Applied"
            sx={{
              bgcolor: "#ECFDF5",
              color: "#15803D",
              fontWeight: 700,
              width: "fit-content",
            }}
          />

          {/* Delivery */}

          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: "#F8FAFC",
            }}
          >

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Avatar
                sx={{
                  bgcolor: "#DBEAFE",
                  color: "#2563EB",
                }}
              >
                <LocalShippingOutlinedIcon />
              </Avatar>

              <Box>

                <Typography
                  fontWeight={700}
                >
                  Estimated Delivery
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Within 3–5 Business Days
                </Typography>

              </Box>

            </Stack>

          </Box>

          {/* Benefits */}

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Why shop with FitMart?
          </Typography>

          <Stack spacing={2}>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Avatar
                sx={{
                  bgcolor: "#EFF6FF",
                  color: "#2563EB",
                }}
              >
                <Inventory2OutlinedIcon />
              </Avatar>

              <Box flex={1}>
                <Typography fontWeight={600}>
                  Ready to Ship
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Products available in stock.
                </Typography>
              </Box>

              <ArrowForwardIosRoundedIcon
                sx={{
                  fontSize: 16,
                  color: "#94A3B8",
                }}
              />
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Avatar
                sx={{
                  bgcolor: "#ECFDF5",
                  color: "#16A34A",
                }}
              >
                <SecurityOutlinedIcon />
              </Avatar>

              <Box flex={1}>
                <Typography fontWeight={600}>
                  Secure Payment
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  256-bit SSL encrypted checkout.
                </Typography>
              </Box>

              <ArrowForwardIosRoundedIcon
                sx={{
                  fontSize: 16,
                  color: "#94A3B8",
                }}
              />
            </Stack>

          </Stack>

          <Divider />

          {/* Footer */}

          <Box
            sx={{
              p: 2.5,
              bgcolor: "#F8FAFC",
              borderRadius: 3,
              border: "1px dashed #CBD5E1",
            }}
          >

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <CheckCircleRoundedIcon
                color="success"
              />

              <Typography
                fontWeight={700}
              >
                You're saving on delivery charges!
              </Typography>

            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={1}
            >
              Your order qualifies for FREE shipping. No
              additional delivery fee will be charged at
              checkout.
            </Typography>

          </Box>

        </Stack>

      </CardContent>
    </Card>
  );
}

export default CheckoutSummary;