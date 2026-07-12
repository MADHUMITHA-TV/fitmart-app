import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductById,
} from "../../redux/slices/productSlice";

import {
  Container,
  Grid,
  Typography,
  Button,
  CardMedia,
  Chip,
  Box,
} from "@mui/material";

function ProductDetails() {

  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    selectedProduct,
    loading,
  } = useSelector(
    (state) => state.products
  );

  useEffect(() => {

    dispatch(fetchProductById(id));

  }, [dispatch, id]);

  if (loading)
    return <h2>Loading...</h2>;

  if (!selectedProduct)
    return <h2>Product not found</h2>;

  return (

    <Container sx={{ mt: 5 }}>

      <Grid container spacing={5}>

        <Grid item xs={12} md={5}>

          <CardMedia
            component="img"
            image={selectedProduct.imageUrl}
            height="500"
          />

        </Grid>

        <Grid item xs={12} md={7}>

          <Typography variant="h4">

            {selectedProduct.name}

          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >

            {selectedProduct.brand}

          </Typography>

          <Chip
            label={selectedProduct.categoryName}
            sx={{ mt: 2 }}
          />

          <Typography
            variant="h4"
            color="primary"
            sx={{ mt: 3 }}
          >

            ₹{selectedProduct.price}

          </Typography>

          <Typography sx={{ mt: 3 }}>

            {selectedProduct.description}

          </Typography>

          <Typography sx={{ mt: 2 }}>

            Stock :
            {" "}
            {selectedProduct.stockQuantity}

          </Typography>

          <Box sx={{ mt: 4 }}>

            <Button
              variant="contained"
              size="large"
            >
              Add to Cart
            </Button>

          </Box>

        </Grid>

      </Grid>

    </Container>

  );

}

export default ProductDetails;