import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Cart.css";
import { ProductCard } from "./component/ProductCard";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await axios.get("/api/products");
        status === 200 && setCartItems(data.products);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      <div className="content-wrapper">
        <main className="content pd-4x pd-top-2x">
          <section className="product-section mg-left-5x">
            <div className="content-header mg-left-2x">
              <p className="h4">Cart</p>
              <p className="t4">(You have 2 items in your cart)</p>
            </div>
            <div className="content-card-section pd-bottom-4x pd-left-1x">
              {cartItems.map((item) => (
                <ProductCard data={item} key={item._id} />
              ))}
            </div>
          </section>
          <section className="checkout-section pd-top-5x">
            <div className="checkout-container wd-4x">
              <p className="h4">PRICE DETAILS</p>

              <hr className="hr mg-top-2x mg-bottom-3x" />

              <div className="grid-2">
                <p className="t4">Price (2 items)</p>
                <p className="t4 text-right">₹3800</p>
              </div>

              <div className="grid-2 mg-top-3x">
                <p className="t4">Discount</p>
                <p className="t4 text-right">-₹400</p>
              </div>

              <hr className="hr mg-top-3x mg-bottom-3x" />

              <div className="grid-2 mg-top-2x">
                <p className="t4">Total Amount</p>
                <p className="t4 text-right">₹3400</p>
              </div>

              <hr className="hr mg-top-3x mg-bottom-3x" />

              <div className="mg-top-2x">
                <p className="t4">You will save ₹400</p>
              </div>

              <button className="btn btn-primary btn-sm mg-top-3x wd-full btn-place-order">
                PLACE ORDER
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export { Cart };
