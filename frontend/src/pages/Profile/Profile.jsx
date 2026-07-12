import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ProfileHeader from "../../components/profile/ProfileHeader";
import StatsCards from "../../components/profile/StatsCards";

import AddressCard from "../../components/profile/AddressCard";
import RecentOrders from "../../components/profile/RecentOrders";
import WishlistPreview from "../../components/profile/WishlistPreview";
import SettingsCards from "../../components/profile/SettingsCards";

import { fetchOrders } from "../../redux/slices/orderSlice";
import { fetchWishlist } from "../../redux/slices/wishlistSlice";
import { fetchCart } from "../../redux/slices/cartSlice";

function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchWishlist());
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 15,
        mb: 8,
      }}
    >
      <ProfileHeader />
      <StatsCards />
    
      <AddressCard />
      <RecentOrders />
      <WishlistPreview />
      <SettingsCards />
    </Container>
  );
}

export default Profile;