import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import ProductCard from "../../components/productCard/ProductCard";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await axios.get("/api/products");
        status === 200 && setWishlist(data.products);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <div className="content-wrapper mg-top-6x">
        <main className="wishlist-content pd-4x pd-top-2x">
          <div className="content-header mg-left-2x">
            <p className="h4">Wishlist</p>
            <p className="t4">(You have wishlist 8 items)</p>
          </div>
          <div className="wishlist-content-card-section pd-bottom-4x pd-left-1x">
            {wishlist.map((item) => (
              <ProductCard data={item} key={item._id} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export { Wishlist };
