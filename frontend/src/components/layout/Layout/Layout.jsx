import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F8FAFC",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          flex: 1,
          pt: "80px",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}

export default Layout;