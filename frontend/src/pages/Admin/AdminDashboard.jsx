import { useEffect, useState } from "react";

import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Stack,
  Chip,
  Divider,
  Button,
} from "@mui/material";

import {
  People,
  Inventory2,
  ShoppingCart,
  CurrencyRupee,
  TrendingUp,
  ArrowForward,
} from "@mui/icons-material";

import { getDashboard } from "../../services/adminApi";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN").format(amount || 0);

function DashboardCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 4,
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)",
        transition: ".3s",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow:
            "0 18px 40px rgba(37,99,235,.18)",
          borderColor: "#2563EB",
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Avatar
          sx={{
            width: 62,
            height: 62,
            background: `linear-gradient(135deg, ${color}, #1D4ED8)`,
            boxShadow:
              "0 10px 25px rgba(37,99,235,.25)",
          }}
        >
          {icon}
        </Avatar>

        <Chip
          label="↑ 12%"
          sx={{
            bgcolor: "#EFF6FF",
            color: "#2563EB",
            fontWeight: 700,
          }}
        />
      </Stack>

      <Box mt={3}>
        <Typography
          sx={{
            color: "#6B7280",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontWeight: 800,
            fontSize: {
              xs: 28,
              sm: 32,
              md: 36,
            },
            color: "#111827",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function AdminDashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response =
          await getDashboard();

        setDashboard(
          response.data.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress
          size={55}
          sx={{
            color: "#2563EB",
          }}
        />
      </Box>
    );
  }

  if (!dashboard) {
    return (
      <Typography color="error">
        Failed to load dashboard.
      </Typography>
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
          color: "#FFFFFF",
          boxShadow:
            "0 18px 40px rgba(37,99,235,.22)",
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
          spacing={3}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
            >
              Welcome Back 👋
            </Typography>

            <Typography
              mt={1}
              sx={{
                opacity: 0.9,
              }}
            >
              Here's your FitMart
              business overview for
              today.
            </Typography>
          </Box>

          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor:
                "rgba(255,255,255,.15)",
            }}
          >
            <TrendingUp
              sx={{
                fontSize: 40,
              }}
            />
          </Avatar>
        </Stack>
      </Paper>

      {/* Dashboard Cards */}

      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <DashboardCard
            title="Total Users"
            value={
              dashboard.totalUsers
            }
            icon={<People />}
            color="#2563EB"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <DashboardCard
            title="Products"
            value={
              dashboard.totalProducts
            }
            icon={<Inventory2 />}
            color="#16A34A"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <DashboardCard
            title="Orders"
            value={
              dashboard.totalOrders
            }
            icon={<ShoppingCart />}
            color="#F59E0B"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <DashboardCard
            title="Revenue"
            value={`₹${formatCurrency(
              dashboard.totalRevenue
            )}`}
            icon={
              <CurrencyRupee />
            }
            color="#DC2626"
          />
        </Grid>
                {/* Quick Statistics */}

        <Grid item xs={12} lg={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              height: "100%",
              border: "1px solid #E5E7EB",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.05)",
              bgcolor: "#FFFFFF",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              color="#111827"
            >
              Quick Statistics
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color="text.secondary">
                  Pending Orders
                </Typography>

                <Chip
                  label={dashboard.pendingOrders}
                  sx={{
                    bgcolor: "#FEF3C7",
                    color: "#B45309",
                    fontWeight: 700,
                  }}
                />
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color="text.secondary">
                  Delivered Orders
                </Typography>

                <Chip
                  label={dashboard.deliveredOrders}
                  sx={{
                    bgcolor: "#DCFCE7",
                    color: "#15803D",
                    fontWeight: 700,
                  }}
                />
              </Box>

              <Divider />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color="text.secondary">
                  Today's Revenue
                </Typography>

                <Typography
                  fontWeight={700}
                  color="#2563EB"
                >
                  ₹
                  {formatCurrency(
                    dashboard.todayRevenue
                  )}
                </Typography>
              </Box>

              <Divider />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color="text.secondary">
                  Revenue Status
                </Typography>

                <Chip
                  label="Growing"
                  color="success"
                  size="small"
                />
              </Box>

              <Divider />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography color="text.secondary">
                  Inventory
                </Typography>

                <Chip
                  label="Healthy"
                  color="primary"
                  size="small"
                />
              </Box>

              <Divider />

              
            </Stack>
          </Paper>
        </Grid>
              </Grid>
    </Box>
  );
}