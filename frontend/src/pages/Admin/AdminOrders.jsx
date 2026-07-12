import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";

import {
  ShoppingCart,
  Delete,
  LocalShipping,
} from "@mui/icons-material";

import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../services/adminApi";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN").format(amount || 0);

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setMessage("Order updated successfully");
      loadOrders();
    } catch {
      setMessage("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await deleteOrder(id);
      setMessage("Order deleted successfully");
      loadOrders();
    } catch {
      setMessage("Delete failed");
    }
  };

  const getColor = (status) => {
    switch (status) {
      case "PENDING":
        return "warning";

      case "PROCESSING":
        return "info";

      case "SHIPPED":
        return "primary";

      case "OUT_FOR_DELIVERY":
        return "secondary";

      case "DELIVERED":
        return "success";

      case "CANCELLED":
        return "error";

      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={55} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "#F8FAFC",
        minHeight: "100vh",
        p: 3,
      }}
    >
      {/* Header */}

      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg,#2563EB,#1D4ED8)",
          color: "#fff",
          boxShadow:
            "0 15px 40px rgba(37,99,235,.25)",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            md: "center",
          }}
          spacing={2}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
            >
              Orders Management
            </Typography>

            <Typography mt={1}>
              View, manage and update
              customer orders.
            </Typography>
          </Box>

          <ShoppingCart
            sx={{
              fontSize: 70,
              opacity: 0.2,
            }}
          />
        </Stack>
      </Paper>

      {/* Orders Table */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid #E5E7EB",
          boxShadow:
            "0 10px 30px rgba(0,0,0,.05)",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                "Order ID",
                "Customer",
                "Amount",
                "Status",
                "Update Status",
                "Action",
              ].map((item) => (
                <TableCell
                  key={item}
                  sx={{
                    bgcolor: "#F1F5F9",
                    fontWeight: 700,
                    color: "#334155",
                    py: 2,
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
                            <TableRow
                key={order.orderId}
                hover
                sx={{
                  transition: "all .25s ease",

                  "&:hover": {
                    backgroundColor: "#F8FAFC",
                  },

                  "& td": {
                    borderBottom: "1px solid #EEF2F7",
                  },
                }}
              >
                {/* Order ID */}

                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#1E293B",
                  }}
                >
                  #{order.orderId}
                </TableCell>

                {/* Customer */}

                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography
                      fontWeight={600}
                    >
                      {order.customerName}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Customer
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Amount */}

                <TableCell>
                  <Typography
                    fontWeight={700}
                    color="#16A34A"
                  >
                    ₹
                    {formatCurrency(
                      order.totalAmount
                    )}
                  </Typography>
                </TableCell>

                {/* Status */}

                <TableCell>
                  <Chip
                    label={order.status.replaceAll(
                      "_",
                      " "
                    )}
                    color={getColor(
                      order.status
                    )}
                    sx={{
                      fontWeight: 700,
                      borderRadius: 2,
                      px: 1,
                    }}
                  />
                </TableCell>

                {/* Update */}

                <TableCell>
                  <Select
                    size="small"
                    value={order.status}
                    sx={{
                      minWidth: 190,
                      borderRadius: 2,
                      bgcolor: "#fff",
                    }}
                    onChange={(e) =>
                      handleStatus(
                        order.orderId,
                        e.target.value
                      )
                    }
                  >
                    <MenuItem value="PENDING">
                      Pending
                    </MenuItem>

                    <MenuItem value="PROCESSING">
                      Processing
                    </MenuItem>

                    <MenuItem value="SHIPPED">
                      Shipped
                    </MenuItem>

                    <MenuItem value="OUT_FOR_DELIVERY">
                      Out For Delivery
                    </MenuItem>

                    <MenuItem value="DELIVERED">
                      Delivered
                    </MenuItem>

                    <MenuItem value="CANCELLED">
                      Cancelled
                    </MenuItem>
                  </Select>
                </TableCell>

                {/* Delete */}

                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      px: 2,
                      boxShadow: "none",

                      "&:hover": {
                        boxShadow:
                          "0 8px 20px rgba(239,68,68,.25)",
                      },
                    }}
                    onClick={() =>
                      handleDelete(
                        order.orderId
                      )
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Snackbar
        open={message !== ""}
        autoHideDuration={2500}
        onClose={() => setMessage("")}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={
            message
              .toLowerCase()
              .includes("failed")
              ? "error"
              : "success"
          }
          variant="filled"
          onClose={() =>
            setMessage("")
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}