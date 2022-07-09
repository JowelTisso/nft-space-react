import React from "react";
import "./ProductCard.css";
import {
  IoStar,
  IoStarOutline,
  IoRemoveCircle,
  IoAddCircle,
} from "react-icons/io5";
import {
  removeFromCart,
  changeQuantity,
  moveToWishlist,
} from "../../products/helper/Cart";
import { useCart } from "../../../context/provider/CartProvider";
import { ART, DECREMENT, INCREMENT } from "../../../utils/Constant";
import { useWishlist } from "../../../context/provider/WishlistProvider";
import { debounce } from "../../../utils/debounce";
import { removeFromWishlist } from "../../products/helper/Wishlist";

const ProductCard = ({
  data: {
    _id,
    title,
    creator,
    price,
    categoryName,
    topBid,
    minBid,
    rank,
    img,
    ratings,
    ratingsCount,
    qty,
  },
  data,
}) => {
  const { cartDispatch } = useCart();

  const { wishlistState, wishlistDispatch } = useWishlist();

  const inWishlist = wishlistState?.wishlistItems.some(
    (item) => item._id === _id
  );

  const decrementQuantity = debounce(() => {
    qty > 1 && changeQuantity(data, cartDispatch, DECREMENT);
  }, 300);

  const incrementQuantity = debounce(() => {
    changeQuantity(data, cartDispatch, INCREMENT);
  }, 300);

  return (
    <div className="card card-horizontal">
      <div className="cart-img">
        <img
          className="card-img-horizontal"
          src={img}
          alt="card image"
          style={{
            objectFit: categoryName === ART ? "cover" : "contain",
          }}
        />
      </div>
      <div className="card-content-horizontal pd-bottom-2x">
        <div className="card-content">
          <p className="card-title hide-ovrflw">{title}</p>
          <p className="card-sub-title hide-ovrflw">{creator}</p>
          <div className="price-container">
            <p className="card-description hide-ovrflw fw-4x">₹{price}</p>
            <p className="card-description hide-ovrflw text-gray strike">
              ₹{Number(price) + 400}
            </p>
          </div>

          <div className="rating-container">
            <div className="rating-container">
              {[...Array(5)].map((_, i) =>
                i + 1 <= ratings ? (
                  <IoStar className="rating" key={i} />
                ) : (
                  <IoStarOutline className="rating" key={i} />
                )
              )}
              <span className="txt-rating"> | ({ratingsCount})</span>
            </div>
          </div>
          <div className="quantity mg-top-2x">
            <p className="quantity-title">Quantity :</p>
            <span
              onClick={decrementQuantity}
              // onClick={() => {
              //   debounce(() => {
              //     qty > 1 && changeQuantity(data, cartDispatch, DECREMENT);
              //   }, 500);
              // }}
            >
              <IoRemoveCircle className="quantity-btn mg-left-2x pointer" />
            </span>
            <p className="quantity-value mg-left-1x text-center">{qty}</p>
            <span
              onClick={incrementQuantity}
              // onClick={() => {
              //   debounce(() => {
              //     changeQuantity(data, cartDispatch, INCREMENT);
              //   }, 500);
              // }}
            >
              <IoAddCircle className="quantity-btn mg-left-1x pointer" />
            </span>
          </div>
        </div>
        <div className="card-btn-container">
          <button
            className="btn btn-primary btn-sm wd-full"
            onClick={() => {
              removeFromCart(data, cartDispatch);
            }}
          >
            REMOVE FROM CART
          </button>
          <button
            className="btn btn-secondary btn-sm wd-full"
            onClick={() => {
              inWishlist
                ? removeFromWishlist(data, wishlistDispatch)
                : moveToWishlist(data, cartDispatch, wishlistDispatch);
            }}
          >
            {inWishlist ? "REMOVE FROM WISHLIST" : "MOVE TO WISHLIST"}
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
