import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Products, Wishlist, Cart, Auth } from "./pages";
import Header from "./components/header/Header";
import Mockman from "mockman-js";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </>
  );
}

export default App;
