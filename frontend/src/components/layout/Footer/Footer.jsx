import {
Box,
Container,
Grid,
Typography,
Link
} from "@mui/material";

function Footer(){

return(

<Box
sx={{
background:"#1f2937",
color:"white",
py:6,
mt:5
}}
>

<Container>

<Grid container spacing={4}>

<Grid size={{ xs: 12, md: 4 }}>

<Typography variant="h5">

FitMart

</Typography>

<Typography mt={2}>

Your one-stop online shopping destination.

</Typography>

</Grid>

<Grid size={{ xs: 12, md: 4 }}>

<Typography variant="h6">

Quick Links

</Typography>

<Link
href="/"
color="inherit"
underline="hover"
display="block"
>

Home

</Link>

<Link
href="/products"
color="inherit"
underline="hover"
display="block"
>

Products

</Link>

<Link
href="/about"
color="inherit"
underline="hover"
display="block"
>

About

</Link>

</Grid>

<Grid size={{ xs: 12, md: 4 }}>

<Typography variant="h6">

Contact

</Typography>

<Typography>

support@fitmart.com

</Typography>

<Typography>

+91 9876543210

</Typography>

</Grid>

</Grid>

<Box
textAlign="center"
mt={5}
>

© 2026 FitMart. All rights reserved.

</Box>

</Container>

</Box>

);

}

export default Footer;