import "./Checkout.css";
import React, { useState } from "react";
import { useAuth } from "../../context/provider/AuthProvider";
import { useAddress } from "../../context/provider/AddressProvider";
import SavedAddress from "./component/SavedAddress";
import { useCart } from "../../context/provider/CartProvider";
import { ProductCard } from "./component/ProductCard";

const Checkout = () => {
  const [addressChangeMode, setAddressChangeMode] = useState(false);

  const {
    authState: { user, activeAddress },
    authDispatch,
  } = useAuth();
  const { addressList } = useAddress();
  const { cartState } = useCart();

  const { _id, name, mobile, address, pin, city, state, landmark } =
    activeAddress;

  const combinedAddress = _id
    ? `${address} ${landmark}, ${city}, ${state}, ${pin}`
    : "No address added";

  const toggleAddressChangeMode = () => {
    setAddressChangeMode((state) => !state);
  };

  return (
    <main className="cart-content pd-4x pd-top-2x">
      <section className="product-section mg-left-5x">
        <div className="content-header mg-left-2x">
          <p className="h4">Checkout</p>
        </div>
        <div className="checkout-info-section pd-bottom-4x pd-left-2x pd-right-2x pd-top-1x mg-top-2x">
          <div className="checkout-address-header">
            <p className="t4">Delivery Address</p>
            <button
              className="btn btn-primary btn-sm"
              onClick={toggleAddressChangeMode}
            >
              Change
            </button>
          </div>
          <hr className="hr mg-top-2x mg-bottom-3x" />
          {addressChangeMode ? (
            addressList.map((data) => {
              return (
                <div key={data._id}>
                  <SavedAddress data={data} />
                </div>
              );
            })
          ) : (
            <>
              <div className="name-container mg-top-2x">
                <p className="t4">{name}</p>
                <p className="t4">{mobile}</p>
              </div>
              <p className="t4 mg-top-1x">{combinedAddress}</p>
            </>
          )}
        </div>

        <div className="checkout-info-section pd-bottom-4x pd-left-2x pd-right-2x pd-top-1x mg-top-2x">
          <div className="checkout-address-header">
            <p className="t4">Order summary</p>
          </div>
          <hr className="hr mg-top-2x mg-bottom-3x" />
          <div className="content-card-section pd-bottom-4x pd-left-1x">
            {cartState?.cartItems?.map((item) => (
              <ProductCard data={item} key={item?._id} />
            ))}
          </div>
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
