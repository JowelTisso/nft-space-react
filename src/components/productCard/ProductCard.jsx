import React from "react";
import {
  IoHeartOutline,
  IoStar,
  IoStarOutline,
  IoHeart,
} from "react-icons/io5";
import "./ProductCard.css";
import { ART, INCREMENT } from "../../utils/Constant";
import { useCart } from "../../context/provider/CartProvider";
import {
  addToCart,
  changeQuantity,
} from "../../pages/products/helper/CartHelper";
import { useWishlist } from "../../context/provider/WishlistProvider";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../pages/products/helper/WishlistHelper";
import { useAuth } from "../../context/provider/AuthProvider";
import { Link } from "react-router-dom";

const ProductCard = ({
  data: {
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
    _id,
  },
  data,
  navigate,
}) => {
  const { cartState, cartDispatch } = useCart();
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { authState } = useAuth();

  const inWishlist = wishlistState?.wishlistItems.some(
    (item) => item._id === data._id
  );

  const wishlistHandler = () => {
    if (authState.loggedIn) {
      !inWishlist
        ? addToWishlist(data, wishlistDispatch)
        : removeFromWishlist(data, wishlistDispatch);
    } else {
      navigate("/auth");
    }
  };

  const addToCartHandler = () => {
    try {
      if (authState.loggedIn) {
        const itemIndex = cartState?.cartItems?.findIndex(
          (item) => item._id === _id
        );
        if (itemIndex > -1) {
          changeQuantity(data, cartDispatch, INCREMENT);
        } else {
          addToCart(data, cartDispatch);
        }
      } else {
        navigate("/auth");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="card-badge " onClick={wishlistHandler}>
        {inWishlist ? (
          <IoHeart className="badge-active t3" />
        ) : (
          <IoHeartOutline className="ic-normal" />
        )}
      </div>
      <Link to={`/product/${_id}`} className="no-deco card-btn-link">
        <img
          className="card-img"
          src={img}
          alt="card image"
          style={{
            objectFit: categoryName === ART ? "cover" : "contain",
          }}
        />
        <div className="card-content">
          <p className="card-title">{title}</p>
          <p className="card-sub-title">{creator}</p>
          <p className="card-description">₹{price}</p>
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
      </Link>
      <div className="card-btn-container">
        <button className="btn btn-primary" onClick={addToCartHandler}>
          ADD TO CART
        </button>
      </div>
    </>
  );
};

export default ProductCard;
