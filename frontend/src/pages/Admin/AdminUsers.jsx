import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  Stack,
  Avatar,
  InputAdornment,
} from "@mui/material";

import {
  Delete,
  People,
  Search,
} from "@mui/icons-material";

import {
  getUsers,
  deleteUser,
} from "../../services/adminApi";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN").format(amount || 0);

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await deleteUser(id);
      setMessage("User deleted successfully");
      loadUsers();
    } catch {
      setMessage("Delete failed");
    }
  };

  const filtered = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
              Users Management
            </Typography>

            <Typography mt={1}>
              Manage registered users,
              roles and customer
              information.
            </Typography>
          </Box>

          <People
            sx={{
              fontSize: 70,
              opacity: .2,
            }}
          />
        </Stack>
      </Paper>

      {/* Search */}

      <TextField
        fullWidth
        placeholder="Search by user name..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#fff",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Users Table */}

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
                "ID",
                "User",
                "Email",
                "Phone",
                "Role",
                "Orders",
                "Spent",
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
            {filtered.map((user) => (
                            <TableRow
                key={user.id}
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
                {/* ID */}

                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#1E293B",
                  }}
                >
                  #{user.id}
                </TableCell>

                {/* User */}

                <TableCell>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#2563EB",
                        width: 42,
                        height: 42,
                        fontWeight: 700,
                      }}
                    >
                      {user.firstName?.charAt(0)}
                    </Avatar>

                    <Box>
                      <Typography
                        fontWeight={600}
                      >
                        {user.firstName}{" "}
                        {user.lastName}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Customer
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                {/* Email */}

                <TableCell>
                  {user.email}
                </TableCell>

                {/* Phone */}

                <TableCell>
                  {user.phone || "-"}
                </TableCell>

                {/* Roles */}

                <TableCell>
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                  >
                    {user.roles?.map((role) => (
                      <Chip
                        key={role}
                        label={role}
                        color={
                          role === "ADMIN"
                            ? "error"
                            : "primary"
                        }
                        size="small"
                        sx={{
                          fontWeight: 600,
                          borderRadius: 2,
                        }}
                      />
                    ))}
                  </Stack>
                </TableCell>

                {/* Orders */}

                <TableCell>
                  <Chip
                    label={
                      user.totalOrders ?? 0
                    }
                    color="info"
                    variant="outlined"
                  />
                </TableCell>

                {/* Amount */}

                <TableCell>
                  <Typography
                    fontWeight={700}
                    color="#16A34A"
                  >
                    ₹
                    {formatCurrency(
                      user.totalSpent
                    )}
                  </Typography>
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
                        user.id
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
          variant="filled"
          severity={
            message
              .toLowerCase()
              .includes("failed")
              ? "error"
              : "success"
          }
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