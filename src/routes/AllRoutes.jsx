import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Products, Wishlist, Cart, Auth, UserProfile } from "../pages";
import PrivateRoutes from "./PrivateRoutes";
import Mockman from "mockman-js";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route
        path="/wishlist"
        element={
          <PrivateRoutes>
            <Wishlist />
          </PrivateRoutes>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoutes>
            <Cart />
          </PrivateRoutes>
        }
      />
      <Route
        path="/user-profile"
        element={
          <PrivateRoutes>
            <UserProfile />
          </PrivateRoutes>
        }
      />
      <Route path="/auth" element={<Auth />} />
      <Route path="/mockman" element={<Mockman />} />
    </Routes>
  );
};

export default AllRoutes;
