import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetail from "./components/Products/ProductDetail";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* User Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetail/>} />
          <Route path="checkout" element={<Checkout/>} />
          <Route path="order-confirmation" element={<OrderConfirmationPage/>} />
          <Route path="my-orders" element={<MyOrdersPage />} />
          <Route path="order/:id" element={<OrderDetailsPage/>} />
        </Route>
        <Route path="/admin/" element={<AdminLayout/>}>
          <Route index element={<AdminHomePage/>} />
          <Route path="users" element={<UserManagement/>} />
        </Route>

        <Route>{/*Admin Layout */}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
