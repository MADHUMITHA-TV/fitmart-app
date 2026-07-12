import api from "./api";

const wishlistService = {
  // Get Wishlist
  getWishlist: async () => {
    const { data } = await api.get("/wishlist");
    return data.data;
  },

  // Add Product
  addToWishlist: async (productId) => {
    const { data } = await api.post(`/wishlist/${productId}`);
    return data.data;
  },

  // Remove Product
  removeFromWishlist: async (productId) => {
    const { data } = await api.delete(`/wishlist/${productId}`);
    return data.data;
  },
};

export default wishlistService;