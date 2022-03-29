import { useReducer } from "react";
import {
  CLEAR,
  FILTER_CATEGORY,
  FILTER_PRODUCT,
  FILTER_RATING,
  PRICE_RANGE,
  PRODUCT_DATA,
  SORT_PRICE,
} from "../../utils/Constant";

export const filterReducer = () => {
  const defaultData = {
    productData: [],
    settings: {
      sort: "",
      filter: {
        includeOutOfStock: false,
        fastDeliveryOnly: false,
      },
      priceRange: 3000,
      rating: "",
      category: {
        Art: false,
        Collectibles: false,
        Wearable: false,
        Equipment: false,
        Entities: false,
      },
    },
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case PRODUCT_DATA:
        return { ...state, productData: action.payload };
      case SORT_PRICE:
        return {
          ...state,
          settings: { ...state.settings, sort: action.payload },
        };
      case FILTER_PRODUCT:
        return {
          ...state,
          settings: { ...state.settings, filter: action.payload },
        };
      case PRICE_RANGE:
        return {
          ...state,
          settings: { ...state.settings, priceRange: action.payload },
        };
      case FILTER_RATING:
        return {
          ...state,
          settings: { ...state.settings, rating: action.payload },
        };
      case FILTER_CATEGORY:
        return {
          ...state,
          settings: { ...state.settings, category: action.payload },
        };
      case CLEAR:
        return defaultData;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultData);

  return { state, dispatch };
};
