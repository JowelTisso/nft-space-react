import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { useWishlist } from "../../context/provider/WishlistProvider";
import { GET_WISHLIST_DATA } from "../../utils/Constant";
import { getUserToken } from "../../utils/TokenHelper";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlistState, wishlistDispatch } = useWishlist();

  const getUserWishlist = async () => {
    try {
      const token = getUserToken();
      if (token) {
        const { status, data } = await axios.get(`/api/user/wishlist`, {
          headers: {
            authorization: token,
          },
        });
        if (status === 200) {
          wishlistDispatch({ type: GET_WISHLIST_DATA, payload: data.wishlist });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <>
      <div className="content-wrapper mg-top-6x">
        <main className="wishlist-content pd-4x pd-top-2x">
          <div className="content-header mg-left-2x">
            <p className="h4">Wishlist</p>
            <p className="t4">
              (You have wishlist {wishlistState?.wishlistItems?.length} items)
            </p>
          </div>
          <div className="wishlist-content-card-section pd-bottom-4x pd-left-1x">
            {wishlistState?.wishlistItems?.map((item) => (
              <ProductCard data={item} key={item._id} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export { Wishlist };
