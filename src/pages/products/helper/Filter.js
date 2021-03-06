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
  ART,
  COLLECTIBLES,
  WEARABLE,
  ENTITIES,
  EQUIPMENT,
  STATUS_POPULAR,
  STATUS_TRENDING,
} from "../../../utils/Constant";

export const sortPrice = (type, list) => {
  switch (type) {
    case HIGH_TO_LOW:
      return [...list].sort(
        (a, b) => parseInt(b.price) - parseInt(a.price)
        // parseInt(b.price) > parseInt(a.price) ? 1 : -1
      );
    case LOW_TO_HIGH:
      return [...list].sort(
        (a, b) => parseInt(a.price) - parseInt(b.price)
        // parseInt(a.price) > parseInt(b.price) ? 1 : -1
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

export const filterCategory = (type, list) => {
  switch (type) {
    case ART:
      return [...list].filter((item) => item.categoryName === ART);
    case COLLECTIBLES:
      return [...list].filter((item) => item.categoryName === COLLECTIBLES);
    case WEARABLE:
      return [...list].filter((item) => item.categoryName === WEARABLE);
    case EQUIPMENT:
      return [...list].filter((item) => item.categoryName === EQUIPMENT);
    case ENTITIES:
      return [...list].filter((item) => item.categoryName === ENTITIES);
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
  list.filter((item) => parseInt(item.price) <= price);

export const filterTrendingStatus = (type, list) => {
  switch (type) {
    case STATUS_POPULAR:
      return [...list].filter((item) => item.status === STATUS_POPULAR);
    case STATUS_TRENDING:
      return [...list].filter((item) => item.status === STATUS_TRENDING);
    default:
      return list;
  }
};
