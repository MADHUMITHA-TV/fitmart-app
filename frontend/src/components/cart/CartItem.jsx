import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useDispatch } from "react-redux";
import {
  updateCartQuantity,
  removeCartItem,
  fetchCart,
} from "../../redux/slices/cartSlice";

import toast from "react-hot-toast";

import "./CartItem.css";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrease = async () => {
    const result = await dispatch(
      updateCartQuantity({
        cartItemId: item.cartItemId,
        quantity: item.quantity + 1,
      })
    );

    if (updateCartQuantity.fulfilled.match(result)) {
      await dispatch(fetchCart());
      toast.success("Quantity updated");
    } else {
      toast.error(result.payload || "Failed to update quantity");
    }
  };

  const handleDecrease = async () => {
    if (item.quantity === 1) {
      handleRemove();
      return;
    }

    const result = await dispatch(
      updateCartQuantity({
        cartItemId: item.cartItemId,
        quantity: item.quantity - 1,
      })
    );

    if (updateCartQuantity.fulfilled.match(result)) {
      await dispatch(fetchCart());
      toast.success("Quantity updated");
    } else {
      toast.error(result.payload || "Failed to update quantity");
    }
  };

  const handleRemove = async () => {
    const result = await dispatch(removeCartItem(item.cartItemId));

    if (removeCartItem.fulfilled.match(result)) {
      await dispatch(fetchCart());
      toast.success("Item removed");
    } else {
      toast.error(result.payload || "Failed to remove item");
    }
  };

  return (
  <Card className="cart-item">
    <CardMedia
      component="img"
      image={item.imageUrl}
      alt={item.productName}
      className="cart-image"
    />

    <CardContent className="cart-content">
      <Typography
        variant="h6"
        fontWeight={700}
        color="#111827"
      >
        {item.productName}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color: "#6B7280",
          fontSize: 15,
        }}
      >
        Price per item
      </Typography>

      <Typography
        sx={{
          color: "#2563EB",
          fontWeight: 700,
          fontSize: 22,
        }}
      >
        ₹{item.price}
      </Typography>

      <Box className="quantity-box">
        <IconButton
          onClick={handleDecrease}
          sx={{
            bgcolor: "#F3F4F6",
            "&:hover": {
              bgcolor: "#E5E7EB",
            },
          }}
        >
          <RemoveIcon />
        </IconButton>

        <Typography
          sx={{
            width: 40,
            textAlign: "center",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {item.quantity}
        </Typography>

        <IconButton
          onClick={handleIncrease}
          sx={{
            bgcolor: "#EFF6FF",
            color: "#2563EB",

            "&:hover": {
              bgcolor: "#DBEAFE",
            },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteOutlineIcon />}
        onClick={handleRemove}
        sx={{
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 600,
          px: 3,
        }}
      >
        Remove Item
      </Button>
    </CardContent>

    <Box
      className="total-price"
      sx={{
        flexDirection: "column",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        Total
      </Typography>

      <Typography
        sx={{
          fontWeight: 800,
          fontSize: 28,
          color: "#2563EB",
        }}
      >
        ₹{item.totalPrice}
      </Typography>
    </Box>
  </Card>
);
}

export default CartItem;