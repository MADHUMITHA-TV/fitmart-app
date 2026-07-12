import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./OrderSummary.css";

function OrderSummary({ cart }) {
   const navigate = useNavigate();
  return (

    <Card className="summary-card">

      <CardContent>

        <Typography variant="h5">

          Order Summary

        </Typography>

        <Divider sx={{ my:2 }}/>

        <Box className="summary-row">

          <span>Items</span>

          <span>{cart.totalItems}</span>

        </Box>

        <Box className="summary-row">

          <span>Subtotal</span>

          <span>₹{cart.grandTotal}</span>

        </Box>

        <Box className="summary-row">

          <span>Shipping</span>

          <span>FREE</span>

        </Box>

        <Divider sx={{ my:2 }}/>

        <Box className="summary-row">

          <strong>Total</strong>

          <strong>₹{cart.grandTotal}</strong>

        </Box>
<Button
    variant="contained"
    fullWidth
    onClick={() => navigate("/checkout")}
>
    Proceed to Checkout
</Button>

      </CardContent>

    </Card>

  );

}

export default OrderSummary;