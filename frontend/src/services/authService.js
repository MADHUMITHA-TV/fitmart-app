import api from "./api";
import { storage } from "../utils/storage";

const authService = {
  async login(credentials) {
    const response = await api.post("/auth/login", credentials);

    const authData = response.data.data;

    storage.setToken(authData.token);
    storage.setUser(authData.user);

    return authData;
  },

  async register(userData) {
    const response = await api.post("/auth/register", userData);

    return response.data.data;
  },

  logout() {
    storage.clear();
  },
};

export default authService;