import {
  ALL_DELIVERY_TYPE,
  FAST_DELIVERY_ONLY,
  IN_STOCK_ONLY,
  INCLUDE_OUT_OF_STOCK,
} from "../../../utils/Constant";

export const sortPrice = (type, list) => {
  switch (type) {
    case "HIGH_TO_LOW":
      return [...list].sort((a, b) =>
        parseFloat(b.price) > parseFloat(a.price) ? 1 : -1
      );
    case "LOW_TO_HIGH":
      return [...list].sort((a, b) =>
        parseFloat(a.price) > parseFloat(b.price) ? 1 : -1
      );
    default:
      return list;
  }
};

export const filterProduct = (type, list) => {
  switch (type) {
    case IN_STOCK_ONLY:
      return [...list].filter((item) => item.inStock);
    case INCLUDE_OUT_OF_STOCK:
      return [...list].filter((item) => item.inStock || !item.inStock);
    case FAST_DELIVERY_ONLY:
      return [...list].filter((item) => item.fastDelivery);
    case ALL_DELIVERY_TYPE:
      return [...list].filter(
        (item) => item.fastDelivery || !item.fastDelivery
      );
    default:
      return list;
  }
};

export const filterPriceRange = (price, list) =>
  list.filter((item) => parseFloat(item.price) <= price);
