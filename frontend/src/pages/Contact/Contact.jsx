import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { motion } from "framer-motion";


import "./Contact.css";

function Contact() {
  return (
    <Box className="contact-page">

      {/* ================= HERO ================= */}

      <Box className="contact-hero">

        <Container maxWidth="md">

          <Typography
            variant="h2"
            className="hero-title"
          >
            Get In Touch
          </Typography>

          <Typography className="hero-subtitle">
            We'd love to hear from you. Whether you have
            questions about our products or need help with
            your order, our team is always ready to assist.
          </Typography>

        </Container>

      </Box>

      {/* ================= CONTACT INFO ================= */}

      <Box className="contact-info">

        <Container maxWidth="lg">

          <Grid container spacing={4}>

            <Grid item xs={12} md={4}>

              <motion.div
                whileHover={{ y: -8 }}
              >

                <Card className="contact-card">

                  <CardContent>

                    <Box className="contact-icon">

                      <EmailOutlinedIcon
                        sx={{ fontSize: 38 }}
                      />

                    </Box>

                    <Typography
                      variant="h6"
                      mt={3}
                      fontWeight={700}
                    >
                      Email Us
                    </Typography>

                    <Typography
                      color="text.secondary"
                      mt={1}
                    >
                      support@fitmart.com
                    </Typography>

                  </CardContent>

                </Card>

              </motion.div>

            </Grid>

            <Grid item xs={12} md={4}>

              <motion.div
                whileHover={{ y: -8 }}
              >

                <Card className="contact-card">

                  <CardContent>

                    <Box className="contact-icon">

                      <PhoneOutlinedIcon
                        sx={{ fontSize: 38 }}
                      />

                    </Box>

                    <Typography
                      variant="h6"
                      mt={3}
                      fontWeight={700}
                    >
                      Call Us
                    </Typography>

                    <Typography
                      color="text.secondary"
                      mt={1}
                    >
                      +91 98765 43210
                    </Typography>

                  </CardContent>

                </Card>

              </motion.div>

            </Grid>

            <Grid item xs={12} md={4}>

              <motion.div
                whileHover={{ y: -8 }}
              >

                <Card className="contact-card">

                  <CardContent>

                    <Box className="contact-icon">

                      <LocationOnOutlinedIcon
                        sx={{ fontSize: 38 }}
                      />

                    </Box>

                    <Typography
                      variant="h6"
                      mt={3}
                      fontWeight={700}
                    >
                      Visit Us
                    </Typography>

                    <Typography
                      color="text.secondary"
                      mt={1}
                    >
                      Coimbatore, Tamil Nadu
                    </Typography>

                  </CardContent>

                </Card>

              </motion.div>

            </Grid>

          </Grid>

        </Container>

      </Box>

      {/* ================= CONTACT FORM ================= */}

      <Box className="contact-section">

        <Container maxWidth="lg">

          <Grid
            container
            spacing={6}
            alignItems="center"
          >

            <Grid item xs={12} md={6}>

              <motion.div
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                }}
              >

                <Box className="contact-form">

                  <Typography
                    variant="h4"
                    gutterBottom
                  >
                    Send us a Message
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mb={3}
                  >
                    Fill out the form below and we'll
                    get back to you shortly.
                  </Typography>

                  <TextField
                    fullWidth
                    label="Full Name"
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Subject"
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Your Message"
                    margin="normal"
                  />

                  <Button
                    variant="contained"
                    className="send-btn"
                  >
                    Send Message
                  </Button>

                </Box>

              </motion.div>

            </Grid>


          </Grid>

        </Container>

      </Box>

      {/* ================= FAQ ================= */}

      <Box className="faq-section">

        <Container maxWidth="lg">

          <Typography
            variant="h3"
            align="center"
            className="faq-title"
          >
            Frequently Asked Questions
          </Typography>

          <Grid container spacing={4}>

            <Grid item xs={12} md={6}>

              <Card className="faq-card">

                <CardContent>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    How long does delivery take?
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mt={1}
                  >
                    Most orders are delivered within
                    2–5 business days across India.
                  </Typography>

                </CardContent>

              </Card>

            </Grid>

            <Grid item xs={12} md={6}>

              <Card className="faq-card">

                <CardContent>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Are your supplements authentic?
                  </Typography>

                  <Typography
                    color="text.secondary"
                    mt={1}
                  >
                    Yes. We only sell products from
                    trusted and verified brands.
                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          </Grid>

        </Container>

      </Box>

    </Box>
  );
}

export default Contact;