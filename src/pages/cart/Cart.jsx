import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/provider/CartProvider";
import "./Cart.css";
import Empty from "./component/Empty";
import { ProductCard } from "./component/ProductCard";

const Cart = () => {
  const navigate = useNavigate();
  const { cartState } = useCart();
  const { totalItems, totalPrice } = cartState;

  const isEmpty = cartState?.cartItems?.length < 1;

  const goToProduct = () => {
    navigate("/products");
  };

  return (
    <>
      <div className="content-wrapper">
        <main className="cart-content pd-4x pd-top-2x">
          <section className="product-section mg-left-5x">
            <div className="content-header mg-left-2x">
              <p className="h4">Cart</p>
              <p className="t4">
                {isEmpty
                  ? "No item in your cart!"
                  : `You have ${totalItems} items in your cart`}{" "}
              </p>
            </div>
            <div className="content-card-section pd-bottom-4x pd-left-1x">
              {cartState?.cartItems?.map((item) => (
                <ProductCard data={item} key={item?._id} />
              ))}
            </div>
          </section>
          <section
            className={`checkout-section pd-top-5x ${
              isEmpty && "hide-section"
            }`}
          >
            <div className="checkout-container">
              <p className="h4">PRICE DETAILS</p>

              <hr className="hr mg-top-2x mg-bottom-3x" />

              <div className="grid-2">
                <p className="t4">Price ({totalItems} items)</p>
                <p className="t4 text-right">₹{totalPrice.toFixed(2)}</p>
              </div>

              <div className="grid-2 mg-top-3x">
                <p className="t4">Discount</p>
                <p className="t4 text-right">
                  -₹{(400 * totalItems).toFixed(2)}
                </p>
              </div>

              <hr className="hr mg-top-3x mg-bottom-3x" />

              <div className="grid-2 mg-top-2x">
                <p className="t4">Total Amount</p>
                <p className="t4 text-right">
                  ₹{(totalPrice - 400 * totalItems).toFixed(2)}
                </p>
              </div>

              <hr className="hr mg-top-3x mg-bottom-3x" />

              <div className="mg-top-2x">
                <p className="t4">
                  You will save ₹{(400 * totalItems).toFixed(2)}
                </p>
              </div>

              <button className="btn btn-primary btn-sm mg-top-3x wd-full btn-place-order">
                PLACE ORDER
              </button>
            </div>
          </section>
          {isEmpty && <Empty />}
        </main>
      </div>
    </>
  );
};

export { Cart };
