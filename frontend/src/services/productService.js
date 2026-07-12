import api from "./api";

const productService = {

  getAll: async () => {
    const { data } = await api.get("/products");
    console.log("API Response:", data);

    return data.data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data.data;
  },

  search: async (keyword) => {
    const { data } = await api.get("/products/search", {
      params: { keyword },
    });

    return data.data;
  },

  getByCategory: async (categoryId) => {
    const { data } = await api.get(
      `/products/category/${categoryId}`
    );

    return data.data;
  },

  getByPrice: async (min, max) => {
    const { data } = await api.get("/products/price", {
      params: {
        min,
        max,
      },
    });

    return data.data;
  },

  getPage: async (
    page = 0,
    size = 12,
    sortBy = "id",
    direction = "asc"
  ) => {
    const { data } = await api.get("/products/page", {
      params: {
        page,
        size,
        sortBy,
        direction,
      },
    });

    return data.data;
  },
};

export default productService;