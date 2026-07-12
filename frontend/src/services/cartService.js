import api from "./api";

const cartService = {

  getCart: async () => {
    const { data } = await api.get("/cart");
    return data.data;
  },

  addToCart: async (productId, quantity = 1) => {
    const { data } = await api.post("/cart", {
      productId,
      quantity,
    });

    return data.data;
  },

  updateQuantity: async (cartItemId, quantity) => {
    const { data } = await api.put(`/cart/${cartItemId}`, {
      quantity,
    });

    return data.data;
  },

  removeItem: async (cartItemId) => {
    const { data } = await api.delete(`/cart/${cartItemId}`);
    return data.data;
  },

  clearCart: async () => {
    const { data } = await api.delete("/cart");
    return data.data;
  },
};

export default cartService;