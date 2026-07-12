import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import heroImage from "../../assets/about.jpg";

import "./About.css";

function About() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 45 }} />,
      title: "Premium Fitness Gear",
      description:
        "High-quality gym equipment, activewear and accessories for every fitness goal.",
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 45 }} />,
      title: "Authentic Supplements",
      description:
        "Shop trusted nutrition products from top fitness brands with complete confidence.",
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 45 }} />,
      title: "Fast Delivery",
      description:
        "Quick and reliable shipping across India with secure packaging.",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 45 }} />,
      title: "24/7 Support",
      description:
        "Our support team is always ready to help you with your orders.",
    },
  ];

  return (
    <Box className="about-page">

      {/* HERO */}

      <Container maxWidth="xl">

        <Grid
          container
          spacing={6}
          alignItems="center"
          className="about-hero"
        >

          <Grid item xs={12} md={6}>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >

              <Typography className="about-tag">
                ABOUT FITMART
              </Typography>

              <Typography
                variant="h2"
                className="about-title"
              >
                Your Trusted
                <br />
                Fitness Partner
              </Typography>

              <Typography className="about-subtitle">

                FitMart helps athletes and fitness
                enthusiasts achieve their goals with
                premium gym equipment, supplements,
                activewear and accessories.

              </Typography>

              <Button
                variant="contained"
                size="large"
                className="shop-btn"
                onClick={() => navigate("/products")}
              >
                Shop Now
              </Button>

            </motion.div>

          </Grid>

         

        </Grid>

      </Container>

      {/* MISSION */}

      <Box className="mission-section">

        <Container maxWidth="md">

          <Typography
            variant="h3"
            align="center"
            className="section-title"
          >
            Our Mission
          </Typography>

          <Typography
            className="mission-text"
            align="center"
          >
            Our mission is simple — to provide premium
            fitness products that inspire healthier
            lifestyles. Whether you're starting your
            fitness journey or training professionally,
            FitMart offers reliable products to help
            you perform your best every day.
          </Typography>

        </Container>

      </Box>

      {/* FEATURES */}

     {/* WHY CHOOSE */}

<Box className="why-fitmart">

  <Container maxWidth="xl">

    <Typography
      variant="h3"
      align="center"
      className="section-title"
    >

      Why Thousands
      <br />

      Choose FitMart

    </Typography>

    

    <Grid
      container
      spacing={4}
      mt={5}
    >

      {[
        {
          icon: "🏋️",
          title: "Premium Equipment",
          desc: "Professional gym equipment built for durability."
        },

        {
          icon: "🥤",
          title: "Authentic Supplements",
          desc: "100% genuine nutrition products from trusted brands."
        },

        {
          icon: "👕",
          title: "Activewear",
          desc: "Comfortable apparel designed for every workout."
        },

     

      ].map((item)=>(

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={item.title}
        >

          <Box className="why-card">

            <Box className="why-icon">

              {item.icon}

            </Box>

            <Typography
              variant="h6"
              mt={3}
              fontWeight={700}
            >

              {item.title}

            </Typography>

            <Typography
              color="text.secondary"
              mt={2}
            >

              {item.desc}

            </Typography>

          </Box>

        </Grid>

      ))}

    </Grid>

  </Container>

</Box>

      

      {/* CTA */}

      <Box className="about-cta">

        <Container>

          <Typography
            variant="h3"
            fontWeight={700}
          >
            Ready to Start Your Fitness Journey?
          </Typography>

          <Typography
            sx={{
              mt: 2,
              mb: 4,
            }}
          >
            Discover premium fitness products
            carefully selected for your goals.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/products")}
          >
            Explore Products
          </Button>

        </Container>

      </Box>

    </Box>
  );
}

export default About;