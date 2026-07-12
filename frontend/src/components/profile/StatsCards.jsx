import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

import { useSelector } from "react-redux";

import "./StatsCards.css";

function StatsCards() {

  const { orders } = useSelector((state) => state.orders);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const stats = [
    {
      title: "Orders",
      value: orders?.length || 0,
      icon: <ShoppingBagOutlinedIcon />,
      color: "#2563eb",
    },
    {
      title: "Wishlist",
      value: wishlist?.items?.length || 0,
      icon: <FavoriteBorderOutlinedIcon />,
      color: "#ec4899",
    },
    {
      title: "Cart",
      value: cart?.totalItems || 0,
      icon: <ShoppingCartOutlinedIcon />,
      color: "#10b981",
    },
    {
      title: "Spent",
      value:
        "₹" +
        (
          orders?.reduce(
            (sum, order) =>
              sum + order.totalAmount,
            0
          ) || 0
        ).toLocaleString(),
      icon: <CurrencyRupeeOutlinedIcon />,
      color: "#f59e0b",
    },
  ];

  return (
    <Grid container spacing={3} sx={{mt: 5,
    mb: 4,}}>
      {stats.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.title}>
          <Card className="stats-card">
            <CardContent>

              <Box
                className="stats-icon"
                sx={{
                  background: item.color,
                }}
              >
                {item.icon}
              </Box>

              <Typography
                variant="h4"
                fontWeight={700}
                mt={2}
              >
                {item.value}
              </Typography>

              <Typography color="text.secondary">
                {item.title}
              </Typography>

            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default StatsCards;