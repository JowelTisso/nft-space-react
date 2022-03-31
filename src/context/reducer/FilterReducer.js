import { useReducer } from "react";
import { reducer } from "./filterReducerHelper";

export const filterReducer = () => {
  const defaultData = {
    productData: [],
    settings: {
      sort: "",
      filter: {
        includeOutOfStock: false,
        fastDeliveryOnly: false,
      },
      priceRange: 4000,
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

  const [state, dispatch] = useReducer(reducer, defaultData);

  return { state, dispatch };
};
