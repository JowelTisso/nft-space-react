import {
  ALL_DELIVERY_TYPE,
  FAST_DELIVERY_ONLY,
  IN_STOCK_ONLY,
  INCLUDE_OUT_OF_STOCK,
  HIGH_TO_LOW,
  LOW_TO_HIGH,
  FOUR_STAR_ABOVE,
  THREE_STAR_ABOVE,
  TWO_STAR_ABOVE,
  ONE_STAR_ABOVE,
} from "../../../utils/Constant";

export const sortPrice = (type, list) => {
  switch (type) {
    case HIGH_TO_LOW:
      return [...list].sort((a, b) =>
        parseFloat(b.price) > parseFloat(a.price) ? 1 : -1
      );
    case LOW_TO_HIGH:
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

export const filterRatings = (type, list) => {
  switch (type) {
    case FOUR_STAR_ABOVE:
      return [...list].filter((item) => item.ratings >= 4);
    case THREE_STAR_ABOVE:
      return [...list].filter((item) => item.ratings >= 3);
    case TWO_STAR_ABOVE:
      return [...list].filter((item) => item.ratings >= 2);
    case ONE_STAR_ABOVE:
      return [...list].filter((item) => item.ratings >= 1);
    default:
      return list;
  }
};

export const filterPriceRange = (price, list) =>
  list.filter((item) => parseFloat(item.price) <= price);
