import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
} from "@mui/material";

import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenter";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  searchProducts,
  fetchProductsByCategory,
  fetchProductsByPrice,
} from "../../redux/slices/productSlice";

import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchWishlist } from "../../redux/slices/wishlistSlice";

import ProductToolbar from "../../components/product/ProductToolbar";
import ProductFilters from "../../components/product/ProductFilters";
import ProductGrid from "../../components/product/ProductGrid";
import ProductPagination from "../../components/product/ProductPagination";

import "./Product.css";

function Products() {

  const dispatch = useDispatch();

  const { products, loading } = useSelector(
    (state) => state.products
  );

  const { categories } = useSelector(
    (state) => state.categories
  );

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("name");

  const [category, setCategory] = useState("");

  const [price, setPrice] = useState([0, 100000]);

  useEffect(() => {

    dispatch(fetchProducts());

    dispatch(fetchCategories());

    dispatch(fetchWishlist());

  }, [dispatch]);

  useEffect(() => {

    const timer = setTimeout(() => {

      if (search.trim()) {

        dispatch(searchProducts(search));

      } else {

        dispatch(fetchProducts());

      }

    }, 300);

    return () => clearTimeout(timer);

  }, [search, dispatch]);

  useEffect(() => {

    if (category) {

      dispatch(fetchProductsByCategory(category));

    } else {

      dispatch(fetchProducts());

    }

  }, [category, dispatch]);

  useEffect(() => {

    dispatch(

      fetchProductsByPrice({

        min: price[0],

        max: price[1],

      })

    );

  }, [price, dispatch]);

  if (loading) return <h2>Loading...</h2>;

  return (

    <Box className="products-page">

      <Container maxWidth="xl">

        {/* Breadcrumb */}

        <Breadcrumbs
          separator={<NavigateNextRoundedIcon fontSize="small" />}
          sx={{ mb: 3 }}
        >

          <Link
            to="/"
            className="breadcrumb-link"
          >
            <HomeRoundedIcon
              fontSize="small"
            />
          </Link>

          <Typography color="text.primary">
            Products
          </Typography>

        </Breadcrumbs>

        {/* Hero */}

       

        {/* Toolbar */}

        <ProductToolbar

          search={search}

          setSearch={setSearch}

          sortBy={sortBy}

          setSortBy={setSortBy}

          productCount={products.length}

        />

        {/* Layout */}

        <Grid
          container
          spacing={4}
          mt={1}
        >

          <Grid
            item
            xs={12}
            md={3}
          >

            <ProductFilters

              categories={categories}

              category={category}

              setCategory={setCategory}

              price={price}

              setPrice={setPrice}

            />

          </Grid>

          <Grid
            item
            xs={12}
            md={9}
          >

            <ProductGrid
              products={products}
            />

          </Grid>

        </Grid>

        <Box mt={6}>

          <ProductPagination

            page={1}

            totalPages={1}

            onChange={() => {}}

          />

        </Box>

      </Container>

    </Box>

  );

}

export default Products;