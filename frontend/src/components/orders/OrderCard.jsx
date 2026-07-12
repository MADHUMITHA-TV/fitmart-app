import {
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Box,
  Button,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import { useNavigate } from "react-router-dom";
import OrderStatusChip from "./OrderStatusChip";
import "./OrderCard.css";

function OrderCard({ order }) {
  const navigate = useNavigate();

  return (
   <Card
    sx={{
        borderRadius:3,
        mb:3
    }}
>

<CardContent>

<Box
display="flex"
justifyContent="space-between"
alignItems="center"
mb={2}
>

<Box>

<Typography variant="h6">

Order #{order.orderId}

</Typography>

<Typography color="text.secondary">

{new Date(order.orderedAt).toLocaleString()}

</Typography>

</Box>

<OrderStatusChip status={order.status}/>

</Box>

<Divider sx={{mb:2}}/>

{order.items.map(item=>(

<Box
key={item.productId}
display="flex"
justifyContent="space-between"
alignItems="center"
mb={2}
>

<Box>

<Typography fontWeight={600}>

{item.productName}

</Typography>

<Typography color="text.secondary">

Qty : {item.quantity}

</Typography>

</Box>

<Typography>

₹{item.totalPrice}

</Typography>

</Box>

))}

<Divider sx={{my:2}}/>

<Box
display="flex"
justifyContent="space-between"
>

<Typography fontWeight={700}>

Total

</Typography>

<Typography
fontWeight={700}
color="primary"
>

₹{order.totalAmount}

</Typography>

</Box>

</CardContent>

</Card>
  );
}

export default OrderCard;