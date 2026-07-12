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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
  Stack,
  Avatar,
  InputAdornment,
  Chip,          // <-- Add this
} from "@mui/material";
import {
  Search,
  Add,
  Delete,
  Edit,
  Inventory2,
} from "@mui/icons-material";

import {
  getProducts,
  getCategories,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../services/adminApi";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN").format(
    amount || 0
  );

export default function AdminProducts() {
  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  const [editing, setEditing] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    stockQuantity: "",
    imageUrl: "",
    categoryId: "",
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data.data);
  };

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const save = async () => {
    if (editing) {
      await updateProduct(
        form.id,
        form
      );

      setMessage(
        "Product Updated Successfully"
      );
    } else {
      await addProduct(form);

      setMessage(
        "Product Added Successfully"
      );
    }

    loadProducts();

    setOpen(false);
  };

  const edit = (product) => {
    setEditing(true);

    setForm(product);

    setOpen(true);
  };

  const remove = async (id) => {
    if (
      !window.confirm(
        "Delete Product?"
      )
    )
      return;

    await deleteProduct(id);

    loadProducts();

    setMessage(
      "Product Deleted Successfully"
    );
  };

  const filtered =
    products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

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
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
            >
              Products
            </Typography>

            <Typography mt={1}>
              Manage your
              inventory, edit
              products and keep
              your catalog updated.
            </Typography>
          </Box>

          <Inventory2
            sx={{
              fontSize: 70,
              opacity: .15,
            }}
          />
        </Stack>
      </Paper>

      {/* Search + Button */}

      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        spacing={2}
        mb={3}
        justifyContent="space-between"
      >
        <TextField
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          sx={{
            width: {
              xs: "100%",
              md: 350,
            },

            "& .MuiOutlinedInput-root":
              {
                bgcolor: "#fff",
                borderRadius: 3,
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

        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            borderRadius: 3,
            textTransform:
              "none",
            px: 3,
          }}
          onClick={() => {
            setEditing(false);

            setForm({
              id: null,
              name: "",
              description: "",
              brand: "",
              price: "",
              stockQuantity:
                "",
              imageUrl: "",
              categoryId: "",
            });

            setOpen(true);
          }}
        >
          Add Product
        </Button>
      </Stack>

      {/* Product Table */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border:
            "1px solid #E5E7EB",
          boxShadow:
            "0 10px 30px rgba(0,0,0,.05)",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                "Image",
                "Product",
                "Brand",
                "Category",
                "Price",
                "Stock",
                "Sold",
                "Actions",
              ].map((item) => (
                <TableCell
                  key={item}
                  sx={{
                    bgcolor:
                      "#F1F5F9",
                    fontWeight: 700,
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map(
              (product) => (
                                <TableRow
                  key={product.id}
                  hover
                  sx={{
                    transition: "0.25s",

                    "&:hover": {
                      backgroundColor: "#F8FAFC",
                    },

                    "& td": {
                      borderBottom: "1px solid #EEF2F7",
                    },
                  }}
                >
                  {/* Product Image */}

                  <TableCell>
                    <Avatar
                      variant="rounded"
                      src={product.imageUrl}
                      alt={product.name}
                      sx={{
                        width: 65,
                        height: 65,
                        borderRadius: 3,
                        bgcolor: "#F3F4F6",
                      }}
                    />
                  </TableCell>

                  {/* Product */}

                  <TableCell>
                    <Typography
                      fontWeight={700}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      ID : {product.id}
                    </Typography>
                  </TableCell>

                  {/* Brand */}

                  <TableCell>
                    <Chip
                      label={product.brand}
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>

                  {/* Category */}

                  <TableCell>
                    <Chip
                      label={product.categoryName}
                      color="secondary"
                      size="small"
                    />
                  </TableCell>

                  {/* Price */}

                  <TableCell>
                    <Typography
                      fontWeight={700}
                      color="#16A34A"
                    >
                      ₹
                      {formatCurrency(
                        product.price
                      )}
                    </Typography>
                  </TableCell>

                  {/* Stock */}

                  <TableCell>
                    <Chip
                      label={
                        product.stockQuantity
                      }
                      color={
                        product.stockQuantity >
                        10
                          ? "success"
                          : "warning"
                      }
                    />
                  </TableCell>

                  {/* Sold */}

                  <TableCell>
                    <Typography
                      fontWeight={600}
                    >
                      {
                        product.soldQuantity
                      }
                    </Typography>
                  </TableCell>

                  {/* Actions */}

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        edit(product)
                      }
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() =>
                        remove(product.id)
                      }
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Add / Edit Product Dialog */}

      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={() =>
          setOpen(false)
        }
        PaperProps={{
          sx: {
            borderRadius: 4,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            pb: 1,
          }}
        >
          {editing
            ? "Edit Product"
            : "Add Product"}
        </DialogTitle>

        <DialogContent
          dividers
        >
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "1fr",
              md: "1fr 1fr",
            }}
            gap={2}
            mt={1}
          >
            <TextField
              label="Product Name"
              name="name"
              value={form.name}
              onChange={
                handleChange
              }
              fullWidth
            />

            <TextField
              label="Brand"
              name="brand"
              value={form.brand}
              onChange={
                handleChange
              }
              fullWidth
            />

            <TextField
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={
                handleChange
              }
              fullWidth
            />

            <TextField
              label="Stock Quantity"
              name="stockQuantity"
              type="number"
              value={
                form.stockQuantity
              }
              onChange={
                handleChange
              }
              fullWidth
            />

            <TextField
              label="Image URL"
              name="imageUrl"
              value={
                form.imageUrl
              }
              onChange={
                handleChange
              }
              fullWidth
            />

            <TextField
              select
              label="Category"
              name="categoryId"
              value={
                form.categoryId
              }
              onChange={
                handleChange
              }
              fullWidth
            >
              {categories.map(
                (
                  category
                ) => (
                  <MenuItem
                    key={
                      category.id
                    }
                    value={
                      category.id
                    }
                  >
                    {
                      category.name
                    }
                  </MenuItem>
                )
              )}
            </TextField>

            <TextField
              label="Description"
              name="description"
              value={
                form.description
              }
              onChange={
                handleChange
              }
              multiline
              rows={5}
              fullWidth
              sx={{
                gridColumn: {
                  md: "1 / span 2",
                },
              }}
            />
          </Box>

          {form.imageUrl && (
            <Box
              mt={3}
            >
              <Typography
                fontWeight={600}
                mb={1}
              >
                Image Preview
              </Typography>

              <Avatar
                variant="rounded"
                src={
                  form.imageUrl
                }
                sx={{
                  width: 170,
                  height: 170,
                  borderRadius: 3,
                }}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{ p: 3 }}
        >
          <Button
            onClick={() =>
              setOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={save}
            sx={{
              borderRadius: 2,
              textTransform:
                "none",
              px: 3,
            }}
          >
            {editing
              ? "Update Product"
              : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={message !== ""}
        autoHideDuration={3000}
        onClose={() =>
          setMessage("")
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity="success"
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
                
