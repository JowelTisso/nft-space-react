import React from "react";
import {
  IoHeartOutline,
  IoStar,
  IoStarOutline,
  IoHeart,
} from "react-icons/io5";
import "./ProductCard.css";
import { ART } from "../../utils/Constant";
import { useCart } from "../../context/provider/CartProvider";
import { addToCart } from "../../pages/products/helper/CartHelper";
import { useWishlist } from "../../context/provider/WishlistProvider";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../pages/products/helper/WishlistHelper";

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
  },
  data,
}) => {
  const { cartDispatch } = useCart();

  const { wishlistState, wishlistDispatch } = useWishlist();

  const inWishlist = wishlistState?.wishlistItems.some(
    (item) => item._id === data._id
  );

  const wishlistHandler = () => {
    !inWishlist
      ? addToWishlist(data, wishlistDispatch)
      : removeFromWishlist(data, wishlistDispatch);
  };

  const addToCartHandler = () => {
    addToCart(data, cartDispatch);
  };

  return (
    <div className="card">
      <div className="card-badge " onClick={wishlistHandler}>
        {inWishlist ? (
          <IoHeart className="badge-active t3" />
        ) : (
          <IoHeartOutline className="ic-normal" />
        )}
      </div>
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
      <div className="card-btn-container">
        <button className="btn btn-primary" onClick={addToCartHandler}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
