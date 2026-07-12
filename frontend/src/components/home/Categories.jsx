import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import gymImg from "../../assets/categories/gym.jpg";
import supplementsImg from "../../assets/categories/supplements.jpg";
import activewearImg from "../../assets/categories/activewear.jpg";
import yogaImg from "../../assets/categories/yoga.jpg";
import cardioImg from "../../assets/categories/cardio.jpg";
import accessoriesImg from "../../assets/categories/accessories.jpg";

import "./categories.css";

const categories = [
  {
    name: "Gym Equipment",
    subtitle: "Strength & Weight Training",
    image: gymImg,
    category: "Gym Equipment",
  },
  {
    name: "Supplements",
    subtitle: "Protein, Vitamins & Nutrition",
    image: supplementsImg,
    category: "Supplements",
  },
  {
    name: "Activewear",
    subtitle: "Train in Comfort & Style",
    image: activewearImg,
    category: "Activewear",
  },
 
  
  {
    name: "Accessories",
    subtitle: "Everything Your Workout Needs",
    image: accessoriesImg,
    category: "Accessories",
  },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <Box className="categories-section">
      <Container maxWidth="xl">

        {/* Heading */}

        <Box className="categories-heading">

          <Typography
            variant="h3"
            className="category-title"
          >
            Shop by Category
          </Typography>


        </Box>

        {/* Categories */}

        <Grid container spacing={4}>

          {categories.map((item, index) => (

            <Grid
              item
              xs={12}
              sm={6}
              lg={4}
              key={item.name}
            >

              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
              >

                <Card
                  className="fitness-category-card"
                  onClick={() =>
                    navigate(
                      `/products?category=${encodeURIComponent(
                        item.category
                      )}`
                    )
                  }
                >

                  {/* Image */}

                  <Box className="category-image-wrapper">

  <img
    src={item.image}
    alt={item.name}
    className="category-image"
  />

  <Box className="image-overlay" />

  <Box className="category-overlay-content">

    <Typography
      variant="h5"
      className="overlay-title"
    >
      {item.name}
    </Typography>

    <Typography
      variant="body2"
      className="overlay-subtitle"
    >
      {item.subtitle}
    </Typography>

  </Box>

</Box>

                  {/* Content */}

                <CardContent className="category-content">

  <Button
    endIcon={<ArrowForwardRoundedIcon />}
    className="shop-btn"
    fullWidth
    variant="contained"
  >
    Shop Collection
  </Button>

</CardContent>

                </Card>

              </motion.div>

            </Grid>

          ))}

        </Grid>

      </Container>
    </Box>
  );
}