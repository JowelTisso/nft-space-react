import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Products,
  Wishlist,
  Cart,
  Auth,
  UserProfile,
  Address,
  Checkout,
} from "../pages";
import PrivateRoutes from "./PrivateRoutes";
import Mockman from "mockman-js";
import SingleProduct from "../pages/singleProduct/SingleProduct";
import NotFound from "../pages/notfound/NotFound";

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
      <Route
        path="/product/:productId"
        element={
          <PrivateRoutes>
            <SingleProduct />
          </PrivateRoutes>
        }
      />
      <Route
        path="/address"
        element={
          <PrivateRoutes>
            <Address />
          </PrivateRoutes>
        }
      />
      <Route
        path="/checkout"
        element={
          <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        }
      />
      <Route path="/auth" element={<Auth />} />
      <Route path="/mockman" element={<Mockman />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
