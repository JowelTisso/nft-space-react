import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { priceSortMenu, ratingsMenu } from "../../utils/FilterData";
import "./Products.css";
import {
  PRICE_RANGE,
  PRODUCT_DATA,
  SORT_PRICE,
  HIGH_TO_LOW,
  LOW_TO_HIGH,
  FOUR_STAR_ABOVE,
  FILTER_RATING,
  THREE_STAR_ABOVE,
  TWO_STAR_ABOVE,
  ONE_STAR_ABOVE,
  ART,
  COLLECTIBLES,
  WEARABLE,
  EQUIPMENT,
  ENTITIES,
  FILTER_CATEGORY,
  CLEAR,
} from "../../utils/Constant";
import { useFilter } from "../../context/provider/FilterProvider";
import {
  filterCategory,
  filterPriceRange,
  filterRatings,
  filterTrendingStatus,
  sortPrice,
} from "./helper/FilterHelper";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [categories, setCategories] = useState([]);

  // Context
  const {
    state: { productData, settings },
    dispatch,
    products,
  } = useFilter();

  const { priceRange } = settings;

  const { state } = useLocation();

  const setInitialCategory = () => {
    if (state && state.hasOwnProperty("category")) {
      onCategoryChange(state.category, true);
    }
  };

  const setInitialStatus = () => {
    if (state && state.hasOwnProperty("status")) {
      const filteredStatus = filterTrendingStatus(state.status, products);
      dispatch({ type: PRODUCT_DATA, payload: filteredStatus });
    }
  };

  const getCategories = async () => {
    try {
      const { status, data } = await axios.get("/api/categories");
      status === 200 && setCategories(data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const sliderOnChange = ({ target }) => {
    dispatch({ type: PRICE_RANGE, payload: target.value });
  };

  const filterAllCategory = (list) => {
    const { Art, Collectibles, Wearable, Equipment, Entities } =
      settings.category;

    const filteredArt = Art ? filterCategory(ART, list) : [];

    const filteredCollectibles = Collectibles
      ? filterCategory(COLLECTIBLES, list)
      : [];

    const filteredWearables = Wearable ? filterCategory(WEARABLE, list) : [];

    const filteredEquipment = Equipment ? filterCategory(EQUIPMENT, list) : [];

    const filteredEntities = Entities ? filterCategory(ENTITIES, list) : [];

    // When all the categories are unchecked return all product
    if (!Art && !Collectibles && !Wearable && !Equipment && !Entities) {
      return list;
    }
    // Spread Filtered categories together
    return [
      ...filteredArt,
      ...filteredCollectibles,
      ...filteredWearables,
      ...filteredEquipment,
      ...filteredEntities,
    ];
  };

  const applySettingsAndRender = () => {
    const sortedList = sortPrice(settings.sort, products);
    const filteredAllCategories = filterAllCategory(sortedList);
    const filteredRatings = filterRatings(
      settings.rating,
      filteredAllCategories
    );
    const filteredPriceRange = filterPriceRange(
      settings.priceRange,
      filteredRatings
    );
    dispatch({ type: PRODUCT_DATA, payload: filteredPriceRange });
  };

  const ratingPayload = (type) => {
    switch (type) {
      case FOUR_STAR_ABOVE:
        return FOUR_STAR_ABOVE;
      case THREE_STAR_ABOVE:
        return THREE_STAR_ABOVE;
      case TWO_STAR_ABOVE:
        return TWO_STAR_ABOVE;
      case ONE_STAR_ABOVE:
        return ONE_STAR_ABOVE;
      default:
        return ONE_STAR_ABOVE;
    }
  };

  const onRatingsChange = (type) => {
    dispatch({
      type: FILTER_RATING,
      payload: ratingPayload(type),
    });
  };

  const onPriceSortChange = (i) => {
    dispatch({
      type: SORT_PRICE,
      payload: i === 0 ? LOW_TO_HIGH : HIGH_TO_LOW,
    });
  };

  const onCategoryChange = (categoryName, checked) => {
    dispatch({
      type: FILTER_CATEGORY,
      payload: { ...settings.category, [categoryName]: checked },
    });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR, payload: {} });
  };

  const priceSliderStyle = {
    background: `linear-gradient(to right, var(--primary-color) ${
      priceRange / 30
    }%, var(--border-color) ${priceRange / 30}%`,
  };

  useEffect(() => {
    applySettingsAndRender();
  }, [settings]);

  useEffect(() => {
    getCategories();
    setInitialCategory();
    setInitialStatus();
    return () => {
      clearFilter();
    };
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <aside
          id="drawer"
          className="sidenav pd-left-4x pd-top-2x pd-right-2x pd-bottom-3x hide-nav"
        >
          <nav>
            <ul className="no-bullet">
              <li className="sidenav-header">
                <p className="t4 mg-bottom-2x fw-4x">Filters</p>
                <p
                  className="t4 mg-bottom-2x fw-4x pointer clear-btn"
                  onClick={clearFilter}
                >
                  Clear
                </p>
              </li>

              <li>
                <p className="t4 fw-4x mg-top-1x">Price</p>
              </li>

              <div id="slide" className="slider-container mg-top-2x">
                <div className="range-label">
                  <label className="t4">₹0</label>
                  <label id="slider-value" className="t4 mg-left-2x">
                    {priceRange}
                  </label>
                  <label className="t4">₹4000</label>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4000}
                  step={100}
                  value={priceRange}
                  className="slider mg-top-2x"
                  onChange={sliderOnChange}
                  style={priceSliderStyle}
                />
              </div>

              <li className="mg-top-2x">
                <p className="t4 fw-4x mg-top-1x">Category</p>
              </li>

              {categories.map(({ categoryName }) => (
                <li className="category-item mg-top-1x" key={categoryName}>
                  <input
                    type="checkbox"
                    name="category"
                    checked={
                      categoryName === ART
                        ? settings.category.Art
                        : categoryName === COLLECTIBLES
                        ? settings.category.Collectibles
                        : categoryName === WEARABLE
                        ? settings.category.Wearable
                        : categoryName === EQUIPMENT
                        ? settings.category.Equipment
                        : categoryName === ENTITIES &&
                          settings.category.Entities
                    }
                    onChange={({ target: { checked } }) => {
                      onCategoryChange(categoryName, checked);
                    }}
                  />
                  <label className="t4">{categoryName}</label>
                </li>
              ))}

              <li className="mg-top-2x">
                <p className="t4 fw-4x mg-top-1x">Ratings</p>
              </li>

              {ratingsMenu.map((item) => (
                <li className="category-item mg-top-1x" key={item}>
                  <input
                    type="radio"
                    name="ratings"
                    onChange={() => onRatingsChange(item)}
                  />
                  <label className="t4">{item}</label>
                </li>
              ))}

              <li className="mg-top-2x">
                <p className="t4 fw-4x mg-top-1x">Sort by</p>
              </li>

              {priceSortMenu.map((item, i) => (
                <li className="category-item mg-top-1x" key={item}>
                  <input
                    type="radio"
                    name="price"
                    onChange={() => onPriceSortChange(i)}
                  />
                  <label className="t4">{item}</label>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="product-content pd-2x">
          <div className="content-header">
            <p className="h4">Showing All NFT</p>
            <p className="t4">(showing {productData.length} products)</p>
          </div>
          <div className="product-content-card-section pd-bottom-4x">
            {productData.map((item) => (
              <ProductCard data={item} key={item._id} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export { Products };
