import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Rating,
} from "@mui/material";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import { addToCart } from "../../redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../../redux/slices/wishlistSlice";

import "./ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addingItems = useSelector(
    (state) => state.cart.addingItems
  );

  const wishlist = useSelector(
    (state) => state.wishlist.wishlist
  );

  const isAdding = addingItems[product.id] || false;

  const isWishlisted =
    wishlist?.items?.some(
      (item) => item.productId === product.id
    ) || false;

  const image =
    product.imageUrl ||
    "https://via.placeholder.com/500x500?text=FitMart";

  const handleAddToCart = async () => {
    const result = await dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
      })
    );

    if (addToCart.fulfilled.match(result)) {
      toast.success(`${product.name} added to cart`);
    } else {
      toast.error(result.payload || "Unable to add product");
    }
  };

  const handleWishlist = async () => {
    if (isWishlisted) {
      const result = await dispatch(
        removeFromWishlist(product.id)
      );

      if (removeFromWishlist.fulfilled.match(result)) {
        toast.success("Removed from wishlist");
        dispatch(fetchWishlist());
      } else {
        toast.error(result.payload);
      }
    } else {
      const result = await dispatch(
        addToWishlist(product.id)
      );

      if (addToWishlist.fulfilled.match(result)) {
        toast.success("Added to wishlist");
        dispatch(fetchWishlist());
      } else {
        toast.error(result.payload);
      }
    }
  };

  return (
    <Card className="product-card">

      {/* Low Stock */}

      {product.stockQuantity <= 5 && (
        <Chip
          label="Low Stock"
          color="error"
          size="small"
          className="stock-chip"
        />
      )}

      {/* Image */}

      <Box className="product-image-wrapper">

        <CardMedia
          component="img"
          image={image}
          alt={product.name}
          className="product-image"
        />

        {/* Wishlist */}

        <IconButton
          className="wishlist-btn"
          onClick={handleWishlist}
        >
          {isWishlisted ? (
            <FavoriteRoundedIcon color="error" />
          ) : (
            <FavoriteBorderRoundedIcon />
          )}
        </IconButton>

        {/* Quick View */}

        <Button
          className="quick-view"
          variant="contained"
          size="small"
          startIcon={<VisibilityRoundedIcon />}
          onClick={() =>
            navigate(`/products/${product.id}`)
          }
        >
          Quick View
        </Button>

      </Box>

      {/* Content */}

      <CardContent className="product-content">

        <Typography className="category">
          {product.categoryName}
        </Typography>

        <Typography
          variant="h6"
          className="product-name"
        >
          {product.name}
        </Typography>

        <Typography
          className="brand"
        >
          {product.brand}
        </Typography>

        <Rating
          value={4.5}
          precision={0.5}
          readOnly
          size="small"
          sx={{ mt: 1 }}
        />

        <Box className="price-row">

          <Typography className="price">
            ₹{product.price}
          </Typography>

        </Box>

        <Box className="button-group">

          <Button
            variant="contained"
            className="cart-btn"
            startIcon={
              <ShoppingCartRoundedIcon />
            }
            disabled={isAdding}
            onClick={handleAddToCart}
          >
            {isAdding
              ? "Adding..."
              : "Add to Cart"}
          </Button>

          <IconButton
            className="icon-btn"
            onClick={() =>
              navigate(`/products/${product.id}`)
            }
          >
            <VisibilityRoundedIcon />
          </IconButton>

        </Box>

      </CardContent>

    </Card>
  );
}

export default ProductCard;