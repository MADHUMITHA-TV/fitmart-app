import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Divider,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import OrderStatusChip from "../orders/OrderStatusChip";

import "./RecentOrders.css";

function RecentOrders() {

  const navigate = useNavigate();

  const { orders } = useSelector(
    (state) => state.orders
  );

  const recentOrders = orders.slice(0, 3);

  return (

    <Card className="recent-orders-card">

      <CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >

          <Typography
            variant="h5"
            fontWeight={700}
          >
            Recent Orders
          </Typography>

          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate("/orders")}
          >
            View All
          </Button>

        </Box>

        {recentOrders.length === 0 ? (

          <Typography color="text.secondary">
            No orders found.
          </Typography>

        ) : (

          recentOrders.map((order) => (

            <Box key={order.orderId}>

              <Box className="order-item">

                <Avatar
                  src={
                    order.items?.[0]?.imageUrl ||
                    "https://via.placeholder.com/90"
                  }
                  variant="rounded"
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: 3,
                  }}
                />

                <Box flex={1}>

                  <Typography fontWeight={700}>
                    Order #{order.orderId}
                  </Typography>

                  <Typography color="text.secondary">
                    {new Date(
                      order.orderedAt
                    ).toLocaleDateString()}
                  </Typography>

                  <Typography mt={1}>
                    {order.items.length} Items
                  </Typography>

                </Box>

                <Box textAlign="right">

                  <OrderStatusChip
                    status={order.status}
                  />

                  <Typography
                    mt={1}
                    fontWeight={700}
                  >
                    ₹{order.totalAmount}
                  </Typography>

                </Box>

              </Box>

              <Divider />

            </Box>

          ))

        )}

      </CardContent>

    </Card>

  );

}

export default RecentOrders;