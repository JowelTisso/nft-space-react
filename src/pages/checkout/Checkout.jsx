import "./Checkout.css";
import React, { useState } from "react";
import { useAuth } from "../../context/provider/AuthProvider";
import { useAddress } from "../../context/provider/AddressProvider";
import SavedAddress from "./component/SavedAddress";
import { useCart } from "../../context/provider/CartProvider";
import { ProductCard } from "./component/ProductCard";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../products/helper/Cart";
import { FcOk } from "react-icons/fc";

const Checkout = () => {
  const [addressChangeMode, setAddressChangeMode] = useState(false);
  const [isPaymentSuccessfull, setIsPaymentSuccessfull] = useState(false);

  const {
    authState: { user, activeAddress },
  } = useAuth();
  const { addressList } = useAddress();
  const { cartState, cartDispatch } = useCart();
  const navigate = useNavigate();
  const { totalPrice } = cartState;

  const { _id, name, mobile, address, pin, city, state, landmark } =
    activeAddress;

  const combinedAddress = _id
    ? `${address} ${landmark}, ${city}, ${state}, ${pin}`
    : "No address added";

  const toggleAddressChangeMode = () => {
    if (addressList.length > 0) {
      setAddressChangeMode((state) => !state);
    } else {
      navigate("/address");
    }
  };

  const loadRazorPay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const paymentHandler = async () => {
    if (!_id) {
      return console.log("Please add address!");
    }
    const response = await loadRazorPay();
    if (!response) return console.error("Error in loading razorpay sdk");
    var options = {
      key_id: process.env.REACT_APP_RAZOR_PAY_API,
      key: process.env.REACT_APP_RAZOR_PAY_API,
      amount: Math.round(totalPrice) * 100,
      currency: "INR",
      name: "NFT SPACE",
      description: "Get your NFTs!",
      image:
        "https://user-images.githubusercontent.com/52632590/171919330-62d3c291-4f88-47fc-9c04-bcf542501515.png",
      handler: function (res) {
        console.log(res);
        cartState.cartItems.map((product) =>
          removeFromCart(product, cartDispatch)
        );
        setIsPaymentSuccessfull(true);
      },
      prefill: {
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email,
        contact: "1234567890",
      },
      theme: {
        color: "#0ea5e9",
      },
    };

    var razorPay = new window.Razorpay(options);
    razorPay.open();
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
              {addressList.length > 0 ? "Change" : "Add Address"}
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

        {isPaymentSuccessfull ? (
          <div className="checkout-info-section pd-bottom-4x pd-left-2x pd-right-2x pd-top-1x mg-top-2x">
            <div className="success-msg">
              <FcOk className="t1" />
              <p className="t3 ">Your order has been placed successfully</p>
            </div>
            <div className="success-action flex-center">
              <button
                className="btn btn-primary mg-top-3x"
                onClick={() => navigate("/products")}
              >
                Shop more
              </button>
            </div>
          </div>
        ) : (
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
        )}
      </section>
      {!isPaymentSuccessfull && (
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

            <button
              className="btn btn-primary btn-sm mg-top-3x wd-full btn-place-order"
              onClick={paymentHandler}
            >
              Proceed to payment
            </button>
          </div>
        </section>
      )}
    </main>
  );
};

export { Checkout };
