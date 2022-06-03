import "./Checkout.css";
import React from "react";

const Checkout = () => {
  return (
    <main className="cart-content pd-4x pd-top-2x">
      <section className="product-section mg-left-5x">
        <div className="content-header mg-left-2x">
          <p className="h4">Checkout</p>
          <p className="t4">Select Address</p>
        </div>
        <div className="content-card-section pd-bottom-4x pd-left-1x">
          {[...Array(3)].map((item, i) => "Address " + i)}
        </div>
      </section>
      <section className={`checkout-section pd-top-5x `}>
        <div className="checkout-container">
          <p className="h4">PRICE DETAILS</p>

          <hr className="hr mg-top-2x mg-bottom-3x" />

          <div className="grid-2">
            <p className="t4">Price 3 items</p>
            <p className="t4 text-right">₹2000</p>
          </div>

          <div className="grid-2 mg-top-3x">
            <p className="t4">Discount</p>
            <p className="t4 text-right">-₹1500</p>
          </div>

          <hr className="hr mg-top-3x mg-bottom-3x" />

          <div className="grid-2 mg-top-2x">
            <p className="t4">Total Amount</p>
            <p className="t4 text-right">₹2000</p>
          </div>

          <hr className="hr mg-top-3x mg-bottom-3x" />

          <div className="mg-top-2x">
            <p className="t4">You will save ₹1500</p>
          </div>

          <button className="btn btn-primary btn-sm mg-top-3x wd-full btn-place-order">
            Proceed to payment
          </button>
        </div>
      </section>
    </main>
  );
};

export { Checkout };
