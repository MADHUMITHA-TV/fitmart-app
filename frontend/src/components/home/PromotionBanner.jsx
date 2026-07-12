import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import "./promotionBanner.css";


function PromotionBanner() {


  const navigate = useNavigate();


  return (

    <Box className="promotion-banner">


      <Container maxWidth="xl">


        <Box className="promotion-wrapper">


          {/* CONTENT */}


          <motion.div

            className="promotion-content"

            initial={{
              opacity:0,
              x:-50
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true
            }}

            transition={{
              duration:.8
            }}

          >


            <Box className="offer-badge">

              <LocalOfferRoundedIcon/>

              Limited Time Offer

            </Box>



            <Typography
              variant="h3"
              className="promotion-title"
            >

              Transform Your Fitness Journey

            </Typography>



            <Typography
              variant="h4"
              className="discount-text"
            >

              Up to 50% OFF

            </Typography>



            <Typography
              className="promotion-description"
            >

              Grab premium gym equipment,
              supplements and activewear at
              unbeatable prices.

            </Typography>



            <Button

              variant="contained"

              endIcon={
                <ArrowForwardRoundedIcon/>
              }

              onClick={() =>
                navigate("/products")
              }

              className="promotion-button"

            >

              Shop Deals

            </Button>



          </motion.div>




          {/* IMAGE SIDE */}



          <motion.div

            className="promotion-image"

            initial={{
              opacity:0,
              scale:.8
            }}

            whileInView={{
              opacity:1,
              scale:1
            }}

            transition={{
              duration:.8
            }}

          >

            <img

              src="/promotion-fitness.png"

              alt="Fitness promotion"

            />


          </motion.div>



        </Box>


      </Container>


    </Box>

  );

}


export default PromotionBanner;