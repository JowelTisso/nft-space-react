import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { FilterProvider } from "./context/provider/FilterProvider";
import { CartProvider } from "./context/provider/CartProvider";

// Call make Server
makeServer();

ReactDOM.render(
  <BrowserRouter>
    <CartProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </CartProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
