import { useSelector } from "react-redux";
import { Container, Grid, Typography } from "@mui/material";

import CartItem from "../../components/cart/CartItem";
import OrderSummary from "../../components/cart/OrderSummary";

import "./Cart.css";

function Cart() {

  const { cart, loading } = useSelector((state) => state.cart);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container className="empty-cart">
        <h1>Your cart is empty</h1>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="cart-page">

      <Typography
        variant="h4"
        className="cart-title"
      >
        Shopping Cart ({cart.totalItems} Items)
      </Typography>

      <Grid container spacing={4}>

        <Grid size={{ xs: 12, md: 8 }}>

          {cart.items.map((item) => (
            <CartItem
              key={item.cartItemId}
              item={item}
            />
          ))}

        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>

          <OrderSummary cart={cart} />

        </Grid>

      </Grid>

    </Container>
  );
}

export default Cart;