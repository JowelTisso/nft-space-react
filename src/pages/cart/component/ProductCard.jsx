import React from "react";
import "./ProductCard.css";
import {
  IoStar,
  IoStarOutline,
  IoRemoveCircle,
  IoAddCircle,
} from "react-icons/io5";

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
}) => {
  return (
    <>
      <div className="card card-horizontal">
        <div>
          <img className="card-img-horizontal" src={img} alt="card image" />
        </div>
        <div className="card-content-horizontal pd-bottom-2x">
          <div className="card-content">
            <p className="card-title hide-ovrflw">{title}</p>
            <p className="card-sub-title hide-ovrflw">{categoryName}</p>
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
              <IoRemoveCircle className="quantity-btn mg-left-2x pointer" />
              <p className="quantity-value mg-left-1x text-center">1</p>
              <IoAddCircle className="quantity-btn mg-left-1x pointer" />
            </div>
          </div>
          <div className="card-btn-container">
            <button className="btn btn-primary btn-sm wd-full">
              REMOVE FROM CART
            </button>
            <button className="btn btn-secondary btn-sm wd-full">
              MOVE TO WISHLIST
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductCard };
