import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { FilterProvider } from "./context/provider/FilterProvider";
import { CartProvider } from "./context/provider/CartProvider";
import { WishlistProvider } from "./context/provider/WishlistProvider";
import { AuthProvider } from "./context/provider/AuthProvider";
import { SidenavProvider } from "./context/provider/SidenavProvider";
import { AddressProvider } from "./pages/address/context/address-context";

// Call make Server
makeServer();

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <SidenavProvider>
        <CartProvider>
          <WishlistProvider>
            <FilterProvider>
              <AddressProvider>
                <App />
              </AddressProvider>
            </FilterProvider>
          </WishlistProvider>
        </CartProvider>
      </SidenavProvider>
    </AuthProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
