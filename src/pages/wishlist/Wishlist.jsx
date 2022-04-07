import React from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { useWishlist } from "../../context/provider/WishlistProvider";

import "./Wishlist.css";

const Wishlist = () => {
  const { wishlistState } = useWishlist();

  return (
    <>
      <div className="content-wrapper">
        <main className="wishlist-content pd-4x pd-top-2x">
          <div className="content-header mg-left-2x">
            <p className="h4">Wishlist</p>
            <p className="t4">
              (You have wishlist {wishlistState?.wishlistItems?.length} items)
            </p>
          </div>
          <div className="wishlist-content-card-section pd-bottom-4x pd-left-1x">
            {wishlistState?.wishlistItems?.map((item) => (
              <div className="product-card" key={item._id}>
                <ProductCard data={item} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export { Wishlist };
