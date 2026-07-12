import api from "./api";

const categoryService = {
  getAll: async () => {
    const { data } = await api.get("/categories");
    return data.data;
  },
};

export default categoryService;