import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Products, Wishlist, Cart } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
