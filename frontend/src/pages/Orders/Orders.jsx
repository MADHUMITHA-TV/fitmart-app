import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Paper,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { fetchOrders } from "../../redux/slices/orderSlice";
import OrderCard from "../../components/orders/OrderCard";

function Orders() {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <Container
        sx={{
          mt: 15,
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 15,
        mb: 8,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h4"
          fontWeight={700}
        >
          My Orders
        </Typography>

        <Chip
          label={`${orders.length} Orders`}
          color="primary"
        />
      </Box>

      {orders.length === 0 ? (
        <Paper
          sx={{
            p: 8,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <ShoppingBagOutlinedIcon
            sx={{
              fontSize: 70,
              color: "#bdbdbd",
            }}
          />

          <Typography
            variant="h5"
            mt={2}
          >
            No Orders Yet
          </Typography>

          <Typography color="text.secondary">
            Start shopping to see your orders here.
          </Typography>
        </Paper>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
          />
        ))
      )}
    </Container>
  );
}

export default Orders;