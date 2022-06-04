import React from "react";
import "../../cart/component/ProductCard.css";
import "./ProductCard.css";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { ART } from "../../../utils/Constant";

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
    qty,
  },
}) => {
  return (
    <div className="card card-horizontal">
      <div className="checkout-img">
        <img
          className="card-img-horizontal"
          src={img}
          alt="card image"
          style={{
            objectFit: categoryName === ART ? "cover" : "contain",
          }}
        />
      </div>
      <div className="card-content-horizontal ">
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

            <p className="quantity-value mg-left-1x text-center">{qty}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
