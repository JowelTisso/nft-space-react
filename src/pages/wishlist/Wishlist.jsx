import "./Wishlist.css";
import React from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { useWishlist } from "../../context/provider/WishlistProvider";
import Empty from "../cart/component/Empty";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlistState } = useWishlist();
  const navigate = useNavigate();

  const isEmpty = wishlistState?.wishlistItems?.length < 1;
  return (
    <div className="content-wrapper">
      <main className="wishlist-content pd-4x pd-top-2x">
        <div className="content-header mg-left-2x">
          <p className="h4">Wishlist</p>
          <p className="t4">
            {isEmpty
              ? "No item in your wishlist!"
              : `You have wishlist ${wishlistState?.wishlistItems?.length} items`}{" "}
          </p>
        </div>
        <div className="wishlist-content-card-section pd-bottom-4x pd-left-1x">
          {wishlistState?.wishlistItems?.map((item) => (
            <div className="product-card" key={item._id}>
              <ProductCard data={item} navigate={navigate} />
            </div>
          ))}
        </div>
        {isEmpty && <Empty />}
      </main>
    </div>
  );
};

export { Wishlist };
