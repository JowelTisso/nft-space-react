import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFilter } from "../../context/provider/FilterProvider";
import "./SingleProduct.css";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { useAuth } from "../../context/provider/AuthProvider";
import { useWishlist } from "../../context/provider/WishlistProvider";
import { useCart } from "../../context/provider/CartProvider";
import { addToWishlist, removeFromWishlist } from "../products/helper/Wishlist";
import { ART, INCREMENT } from "../../utils/Constant";
import { addToCart, changeQuantity } from "../products/helper/Cart";

const SingleProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const { productId } = useParams();
  const { products } = useFilter();
  const { cartState, cartDispatch } = useCart();
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { authState } = useAuth();
  const navigate = useNavigate();

  const inWishlist = wishlistState?.wishlistItems.some(
    (item) => item._id === selectedProduct._id
  );

  const inCart = cartState.cartItems.some((item) => item._id === productId);

  const wishlistHandler = () => {
    if (authState.loggedIn) {
      !inWishlist
        ? addToWishlist(selectedProduct, wishlistDispatch)
        : removeFromWishlist(selectedProduct, wishlistDispatch);
    } else {
      navigate("/auth");
    }
  };

  const addToCartHandler = () => {
    try {
      if (authState.loggedIn) {
        if (inCart) {
          navigate("/cart");
        } else {
          addToCart(selectedProduct, cartDispatch);
        }
      } else {
        navigate("/auth");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const findByProductId = (productId, list) => {
    return list.find((item) => item._id.includes(productId));
  };

  useEffect(() => {
    (() => {
      const product = findByProductId(productId, products);
      setSelectedProduct(product);
    })();
  }, []);

  return (
    <div className="single-product-wrapper flex-center">
      <div className="card card-horizontal">
        <div className="badge-container">
          <img
            className="card-img-horizontal"
            src={selectedProduct.img}
            alt="card image"
            style={{
              objectFit:
                selectedProduct.categoryName === ART ? "cover" : "contain",
            }}
          />
          <p className="badge bdg-t">{selectedProduct.status}</p>
        </div>
        <div className="card-content-horizontal">
          <div className="card-content">
            <span>
              <p className="card-title">{selectedProduct.title}</p>
              <p className="badge bdg-rank bdg-t">{selectedProduct.rank}</p>
            </span>
            <p className="card-sub-title">{selectedProduct.creator}</p>
            <p className="card-description">
              {selectedProduct.title} is created by {selectedProduct.creator}{" "}
              which is in the rank {selectedProduct.rank} with Top bid as ₹
              {selectedProduct.topBid} and min bid as ₹{selectedProduct.minBid}
            </p>
            <p className="card-description mg-top-2x card-category-name">
              Category : {selectedProduct.categoryName}
            </p>
            <p className="card-description card-category-price">
              Price : ₹{selectedProduct.price}
            </p>
            <div className="rating-container mg-top-2x">
              {[...Array(5)].map((_, i) =>
                i + 1 <= selectedProduct.ratings ? (
                  <IoStar className="rating" key={i} />
                ) : (
                  <IoStarOutline className="rating" key={i} />
                )
              )}
              <span className="txt-rating">
                {" "}
                | ({selectedProduct.ratingsCount})
              </span>
            </div>
          </div>
          <div className="card-btn-container">
            <button className="btn btn-primary" onClick={addToCartHandler}>
              {inCart ? " GO TO CART" : "ADD TO CART"}
            </button>
            <button className="btn btn-secondary" onClick={wishlistHandler}>
              {inWishlist ? "REMOVE" : "ADD TO WISHLIST"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
