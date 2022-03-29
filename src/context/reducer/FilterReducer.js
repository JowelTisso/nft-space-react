import { useReducer } from "react";
import {
  CLEAR,
  FILTER_PRODUCT,
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
      priceRange: 1000,
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
      case CLEAR:
        return defaultData;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultData);

  return { state, dispatch };
};
