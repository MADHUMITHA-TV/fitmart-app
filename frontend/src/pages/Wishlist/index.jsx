import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../redux/slices/wishlistSlice";

import ProductCard from "../../components/product/ProductCard";

import "./Wishlist.css";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    wishlist,
    loading,
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (loading) {
    return (
      <Box className="wishlist-loader">
        <CircularProgress size={55} />
      </Box>
    );
  }

  return (
    <Box className="wishlist-page">

      {/* HERO */}

      <Box className="wishlist-hero">

        <Container maxWidth="lg">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <FavoriteRoundedIcon
              sx={{
                fontSize: 60,
                color: "#2563EB",
              }}
            />

            <Typography
              variant="h3"
              className="wishlist-title"
            >
              My Wishlist
            </Typography>

            <Typography className="wishlist-subtitle">
              Save your favourite fitness essentials and
              purchase them whenever you're ready.
            </Typography>

            <Typography
              className="wishlist-count"
            >
              {wishlist?.items?.length || 0} Products Saved
            </Typography>

          </motion.div>

        </Container>

      </Box>

      {/* PRODUCTS */}

      <Container
        maxWidth="xl"
        sx={{ pb: 8 }}
      >

        {!wishlist ||
        wishlist.items.length === 0 ? (

          <Box className="empty-wishlist">

            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: 80,
                color: "#CBD5E1",
              }}
            />

            <Typography
              variant="h5"
              fontWeight={700}
              mt={2}
            >
              Your Wishlist is Empty
            </Typography>

            <Typography
              color="text.secondary"
              mt={2}
              mb={4}
            >
              Explore our premium fitness collection and
              save products you love.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </Button>

          </Box>

        ) : (

          <Grid
            container
            spacing={4}
          >

            {wishlist.items.map((item) => (

              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item.productId}
              >

                <motion.div
                  whileHover={{
                    y: -8,
                  }}
                >

                  <ProductCard
                    product={{
                      id: item.productId,
                      name: item.productName,
                      brand: item.brand,
                      price: item.price,
                      imageUrl: item.imageUrl,
                      categoryName: "",
                      stockQuantity: 100,
                    }}
                  />

                </motion.div>

              </Grid>

            ))}

          </Grid>

        )}

      </Container>

    </Box>
  );
}

export default Wishlist;