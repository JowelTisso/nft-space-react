import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import ProductCard from "../../components/productCard/ProductCard";
import "./Products.css";

const Products = (props) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [products, setProducts] = useState([]);

  const data = useLocation();
  console.log(data);

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await axios.get("/api/products");
        status === 200 && setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      <Header />
      <div className="content-wrapper">
        <aside
          id="drawer"
          className="sidenav pd-left-4x pd-top-2x pd-right-2x pd-bottom-3x hide-nav"
        >
          <nav>
            <ul className="no-bullet">
              <li className="sidenav-header">
                <p className="t4 mg-bottom-2x fw-4x">Filters</p>
                <p className="t4 mg-bottom-2x fw-4x pointer clear-btn">Clear</p>
              </li>

              <li>
                <p className="t4 fw-4x mg-top-1x">Price</p>
              </li>

              <div id="slide" className="slider-container mg-top-2x">
                <div className="range-label">
                  <label className="t4">₹0</label>
                  <label id="slider-value" className="t4 mg-left-2x">
                    {sliderValue}
                  </label>
                  <label className="t4">₹3000</label>
                </div>
                <input
                  type="range"
                  min={0}
                  max={3000}
                  value={sliderValue}
                  step={100}
                  className="slider mg-top-2x"
                  onChange={({ target }) => {
                    setSliderValue(target.value);
                  }}
                />
              </div>

              <li className="mg-top-2x">
                <p className="t4 fw-4x mg-top-1x">Category</p>
              </li>

              <li className="category-item mg-top-1x">
                <input type="checkbox" name="" id="" />
                <label className="t4 mg-top-1x">Art</label>
              </li>

              <li className="category-item">
                <input type="checkbox" name="" id="" />
                <label className="t4 mg-top-1x">Collectibles</label>
              </li>

              <li className="category-item">
                <input type="checkbox" name="" id="" />
                <label className="t4 mg-top-1x">Music</label>
              </li>

              <li className="category-item">
                <input type="checkbox" name="" id="" />
                <label className="t4 mg-top-1x">Photography</label>
              </li>

              <li className="category-item">
                <input type="checkbox" name="" id="" />
                <label className="t4 mg-top-1x">Sports</label>
              </li>

              <li className="category-item">
                <input type="checkbox" name="" id="" />
                <label className="t4 mg-top-1x">Utility</label>
              </li>

              <li className="mg-top-2x">
                <p className="t4 fw-4x mg-top-1x">Ratings</p>
              </li>

              <li className="category-item mg-top-1x">
                <input type="radio" name="" id="" />
                <label className="t4 mg-top-1x">4 Stars & above</label>
              </li>

              <li className="category-item">
                <input type="radio" name="" id="" />
                <label className="t4 mg-top-1x">3 Stars & above</label>
              </li>

              <li className="category-item">
                <input type="radio" name="" id="" />
                <label className="t4 mg-top-1x">2 Stars & above</label>
              </li>

              <li className="category-item">
                <input type="radio" name="" id="" />
                <label className="t4 mg-top-1x">1 Stars & above</label>
              </li>

              <li className="mg-top-2x">
                <p className="t4 fw-4x mg-top-1x">Sort by</p>
              </li>

              <li className="category-item mg-top-1x">
                <input type="radio" name="" id="" />
                <label className="t4 mg-top-1x">Price - Low to High</label>
              </li>

              <li className="category-item">
                <input type="radio" name="" id="" />
                <label className="t4 mg-top-1x">Price - High to Low</label>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="product-content pd-2x">
          <div className="content-header">
            <p className="h4">Showing All NFT</p>
            <p className="t4">(showing 8 products)</p>
          </div>
          <div className="product-content-card-section pd-bottom-4x">
            {products.map((item) => (
              <ProductCard data={item} key={item._id} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export { Products };
