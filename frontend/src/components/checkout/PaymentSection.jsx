import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Box,
  Chip,
} from "@mui/material";

import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function PaymentSection({
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={600}
      >
        Payment Method
      </Typography>

      <RadioGroup
        value={paymentMethod}
        onChange={(e) =>
          setPaymentMethod(e.target.value)
        }
      >
        {/* Cash On Delivery */}

        <Paper
          elevation={1}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 3,
          }}
        >
          <FormControlLabel
            value="Cash On Delivery"
            control={<Radio />}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <PaymentsIcon color="success" />

                <Typography>
                  Cash On Delivery
                </Typography>
              </Box>
            }
          />
        </Paper>

        {/* UPI */}

        <Paper
          elevation={1}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 3,
            opacity: 0.6,
          }}
        >
          <FormControlLabel
            disabled
            value="UPI"
            control={<Radio />}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <AccountBalanceWalletIcon />

                <Typography>
                  UPI
                </Typography>

                <Chip
                  size="small"
                  label="Coming Soon"
                  color="warning"
                />
              </Box>
            }
          />
        </Paper>

        {/* Card */}

        <Paper
          elevation={1}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 3,
            opacity: 0.6,
          }}
        >
          <FormControlLabel
            disabled
            value="Card"
            control={<Radio />}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CreditCardIcon />

                <Typography>
                  Credit / Debit Card
                </Typography>

                <Chip
                  size="small"
                  label="Coming Soon"
                  color="warning"
                />
              </Box>
            }
          />
        </Paper>

        {/* Net Banking */}

        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 3,
            opacity: 0.6,
          }}
        >
          <FormControlLabel
            disabled
            value="Net Banking"
            control={<Radio />}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <AccountBalanceIcon />

                <Typography>
                  Net Banking
                </Typography>

                <Chip
                  size="small"
                  label="Coming Soon"
                  color="warning"
                />
              </Box>
            }
          />
        </Paper>
      </RadioGroup>

      <Box
        sx={{
          mt: 3,
          p: 2,
          bgcolor: "#f5f5f5",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
        >
          ✔ Secure Payment
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          ✔ SSL Encrypted Checkout
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          ✔ 100% Safe Transactions
        </Typography>
      </Box>
    </>
  );
}

export default PaymentSection;