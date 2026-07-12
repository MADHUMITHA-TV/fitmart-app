import api from "./api";

const orderService = {
  placeOrder: async (orderData) => {
    const { data } = await api.post("/orders", orderData);
    return data.data;
  },

  getMyOrders: async () => {
    const { data } = await api.get("/orders/my");
    return data.data;
  },

  getOrder: async (orderId) => {
    const { data } = await api.get(`/orders/${orderId}`);
    return data.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const { data } = await api.put(
      `/orders/${orderId}/status?status=${status}`
    );

    return data.data;
  },

  deleteOrder: async (orderId) => {
    const { data } = await api.delete(`/orders/${orderId}`);
    return data.data;
  },
};

export default orderService;