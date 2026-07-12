import {
  Grid,
  Box,
  Typography,
  Button,
} from "@mui/material";

import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";

import { useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";

function ProductGrid({ products }) {

  const navigate = useNavigate();

  if (!products.length) {

    return (

      <Box
        sx={{
          textAlign: "center",
          py: 10,
          background: "#fff",
          borderRadius: 5,
          border: "1px solid #E5E7EB",
          boxShadow: "0 10px 25px rgba(0,0,0,.05)",
        }}
      >

        <SentimentDissatisfiedRoundedIcon
          sx={{
            fontSize: 70,
            color: "#94A3B8",
          }}
        />

        <Typography
          variant="h5"
          fontWeight={700}
          mt={2}
        >
          No Products Found
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Try changing the filters or search term.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            borderRadius: 3,
            px: 4,
          }}
          onClick={() => navigate("/products")}
        >
          Browse All Products
        </Button>

      </Box>

    );

  }

  return (

    <Grid
      container
      spacing={3.5}
    >

      {products.map((product) => (

        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          key={product.id}
        >

          <ProductCard product={product} />

        </Grid>

      ))}

    </Grid>

  );

}

export default ProductGrid;