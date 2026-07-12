import axios from "axios";

import { API_BASE_URL } from "../constants/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ====================
// Dashboard
// ====================

export const getDashboard = () =>
  API.get("/admin/dashboard");


// ====================
// Users
// ====================

export const getUsers = () =>
  API.get("/admin/users");

export const getUser = (id) =>
  API.get(`/admin/users/${id}`);

export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`);

export const updateUser = (id, data) =>
  API.put(`/admin/users/${id}`, data);


// ====================
// Products
// ====================

export const getProducts = () =>
  API.get("/products");

export const getProduct = (id) =>
  API.get(`/products/${id}`);

export const addProduct = (data) =>
  API.post("/admin/products", data);

export const updateProduct = (id, data) =>
  API.put(`/admin/products/${id}`, data);

export const deleteProduct = (id) =>
  API.delete(`/admin/products/${id}`);


// ====================
// Orders
// ====================

export const getOrders = () =>
  API.get("/admin/orders");

export const getOrder = (id) =>
  API.get(`/admin/orders/${id}`);

export const updateOrderStatus = (id, status) =>
  API.put(`/admin/orders/${id}/status?status=${status}`);

export const deleteOrder = (id) =>
  API.delete(`/admin/orders/${id}`);

export const getCategories = () =>
    API.get("/categories");





