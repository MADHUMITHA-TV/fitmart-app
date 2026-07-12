import { Chip } from "@mui/material";

function OrderStatusChip({ status }) {
  let color = "default";

  switch (status) {
    case "PENDING":
      color = "warning";
      break;

    case "CONFIRMED":
      color = "info";
      break;

    case "SHIPPED":
      color = "primary";
      break;

    case "DELIVERED":
      color = "success";
      break;

    case "CANCELLED":
      color = "error";
      break;

    default:
      color = "default";
  }

  return (
    <Chip
      label={status}
      color={color}
      sx={{
        fontWeight: 600,
        borderRadius: 2,
      }}
    />
  );
}

export default OrderStatusChip;