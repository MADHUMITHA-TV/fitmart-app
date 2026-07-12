import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout/Layout";
import ProtectedRoute from "../components/layout/ProtectedRoute/ProtectedRoute";
import AdminRoute from "../components/layout/AdminRoute/AdminRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminOrders from "../pages/Admin/AdminOrders";
import AdminProducts from "../pages/Admin/AdminProducts";
import AdminUsers from "../pages/Admin/AdminUsers";

// Admin Layout
import AdminLayout from "../components/admin/AdminLayout";

function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ================= USER ROUTES ================= */}

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* ================= AUTH ================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        {/* Automatically go to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      {/* ================= 404 ================= */}

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default AppRoutes;