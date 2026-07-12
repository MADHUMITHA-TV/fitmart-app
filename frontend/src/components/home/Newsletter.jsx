import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenter";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";

import "./Newsletter.css";


function Newsletter() {


  return (

    <Box className="newsletter">


      <Container maxWidth="lg">


        <Box className="newsletter-card">


          {/* Header */}


          <Typography
            className="newsletter-title"
            variant="h3"
          >

            Join the FitMart Community

          </Typography>



          <Typography
            className="newsletter-subtitle"
          >

            Get exclusive fitness deals, workout tips,
            nutrition advice and product updates
            delivered to your inbox.

          </Typography>



          {/* Form */}


          <Box className="newsletter-form">


            <TextField

              fullWidth

              placeholder="Enter your email address"

              className="newsletter-input"

            />


            <Button

              variant="contained"

              startIcon={
                <EmailRoundedIcon/>
              }

              className="newsletter-button"

            >

              Subscribe

            </Button>


          </Box>



          {/* Benefits */}


          <Stack

            className="newsletter-benefits"

            direction={{
              xs:"column",
              sm:"row"
            }}

            spacing={3}

          >


            <Box className="benefit-item">

              <FitnessCenterRoundedIcon/>

              <Typography>
                Workout Tips
              </Typography>

            </Box>



            <Box className="benefit-item">

              <LocalOfferRoundedIcon/>

              <Typography>
                Exclusive Offers
              </Typography>

            </Box>



            <Box className="benefit-item">

              <HealthAndSafetyRoundedIcon/>

              <Typography>
                Nutrition Updates
              </Typography>

            </Box>



          </Stack>



        </Box>


      </Container>


    </Box>

  );

}


export default Newsletter;