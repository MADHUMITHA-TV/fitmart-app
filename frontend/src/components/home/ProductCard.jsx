import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Chip,
  Rating,
  Box
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useNavigate } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useDispatch, useSelector } from "react-redux";

import {
    addToWishlist,
    removeFromWishlist,
} from "../../redux/slices/wishlistSlice";

import toast from "react-hot-toast";
import "./productCard.css";

function ProductCard({ product }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

const { wishlist } = useSelector(
    (state) => state.wishlist
);
const isWishlisted =
    wishlist?.items?.some(
        (item) => item.productId === product.id
    ) || false;

const handleWishlist = async () => {

    try {

        if (isWishlisted) {

            await dispatch(
                removeFromWishlist(product.id)
            ).unwrap();

            toast.success("Removed from Wishlist");

        } else {

            await dispatch(
                addToWishlist(product.id)
            ).unwrap();

            toast.success("Added to Wishlist");

        }

    } catch (err) {

        toast.error(err);

    }

};

  return (

<Card className="product-card">

<Chip
label={product.discount}
color="error"
className="discount-chip"
/>

<CardMedia

component="img"

height="220"

image={product.image}

/>

<CardContent>

<Typography variant="h6">

{product.name}

</Typography>

<Rating

value={product.rating}

precision={0.5}

readOnly

/>

<Box mt={1}>

<Typography
variant="h6"
color="primary"
>

₹{product.price}

</Typography>

<Typography

sx={{
textDecoration:"line-through"
}}

>

₹{product.oldPrice}

</Typography>

</Box>

</CardContent>

<CardActions>

<IconButton
    color="error"
    onClick={handleWishlist}
>

    {isWishlisted ? (

        <FavoriteIcon />

    ) : (

        <FavoriteBorderIcon />

    )}

</IconButton>

<Button

variant="contained"

startIcon={<ShoppingCartIcon/>}

>

Add

</Button>

<Button

onClick={()=>navigate(`/products/${product.id}`)}

>

View

</Button>

</CardActions>

</Card>

);

}

export default ProductCard;