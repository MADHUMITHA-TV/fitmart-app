import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import heroImage from "../../assets/fitnessathlete.jpg";
import "./hero.css";


function Hero() {

  const navigate = useNavigate();


  return (

    <Box className="hero">


      <Container maxWidth="xl">


        <Box className="hero-wrapper">


          {/* LEFT CONTENT */}

          <motion.div

            className="hero-content"

            initial={{
              opacity:0,
              x:-50
            }}

            animate={{
              opacity:1,
              x:0
            }}

            transition={{
              duration:.8
            }}

          >

            <Typography
              variant="h1"
              className="hero-title"
            >

              Build Your
              <br/>

              <span>
                Stronger Self
              </span>

            </Typography>


            <Typography
              className="hero-subtitle"
            >

              Premium gym equipment,
              supplements and activewear
              designed to power your fitness journey.

            </Typography>


            <Box className="hero-buttons">


              <Button

                variant="contained"

                startIcon={
                  <FitnessCenterIcon/>
                }

                onClick={() =>
                  navigate("/products")
                }

              >

                Shop Fitness Gear

              </Button>



              <Button

                variant="outlined"

                onClick={() =>
                  navigate("/products?category=Supplements")
                }

              >

                Explore Supplements

              </Button>


            </Box>


          </motion.div>



          {/* RIGHT IMAGE */}


          <motion.div

            className="hero-image-container"

            initial={{
              opacity:0,
              x:50
            }}

            animate={{
              opacity:1,
              x:0
            }}

            transition={{
              duration:.8
            }}

          >

            <img

              src={heroImage}

              alt="Fitness athlete"

              className="hero-image"

            />


          </motion.div>


        </Box>


      </Container>


    </Box>

  );
}


export default Hero;