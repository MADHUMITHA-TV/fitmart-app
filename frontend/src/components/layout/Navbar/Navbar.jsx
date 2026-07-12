import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../../redux/slices/cartSlice";
import { logout } from "../../../redux/slices/authSlice";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  InputBase,
  alpha,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { fetchWishlist } from "../../../redux/slices/wishlistSlice";
import { motion } from "framer-motion";

import "./navbar.css";
import UserMenu from "./UserMenu";
import MobileDrawer from "./MobileDrawer";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  
  useEffect(() => {

    if(isAuthenticated){

        dispatch(fetchCart());
        dispatch(fetchWishlist());

    }

},[dispatch,isAuthenticated]);
const { cart } = useSelector((state) => state.cart);
const cartCount = cart?.totalItems || 0;
const { wishlist } = useSelector((state) => state.wishlist);

const wishlistCount = wishlist?.items?.length || 0;

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        className="navbar"
      >
        <Toolbar className="toolbar">

          {/* Mobile Menu */}

          <IconButton
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}

          <Typography
            component={Link}
            to="/"
            variant="h5"
            className="logo"
          >
            FitMart
          </Typography>

         

          {/* Desktop Links */}

          <Box
            className="desktop-links"
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 2,
              ml: 3,
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/"
            >
              Home
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/products"
            >
              Products
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/about"
            >
              About
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/contact"
            >
              Contact
            </Button>
          </Box>

          {/* Spacer */}

          <Box sx={{ flexGrow: 1 }} />

          {/* Wishlist */}

          <motion.div whileHover={{ scale: 1.1 }}>
            <IconButton
              color="inherit"
              component={Link}
              to="/wishlist"
            >
              <Badge
                badgeContent={wishlistCount}
                color="error"
              >
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
          </motion.div>

          {/* Cart */}

          <motion.div whileHover={{ scale: 1.1 }}>
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
            >
              <Badge
                badgeContent={cartCount}
                color="error"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </motion.div>

          {/* User */}

          <motion.div whileHover={{ scale: 1.1 }}>
            <IconButton
              color="inherit"
              onClick={openMenu}
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
          </motion.div>

        </Toolbar>
      </AppBar>

      <UserMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        authenticated={isAuthenticated}
        navigate={navigate}
        onLogout={handleLogout}
      />

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navigate={navigate}
      />
    </>
  );
}

export default Navbar;