import { UPDATE_CART_DATA } from "../../../utils/Constant";

const getTotalItems = (cartList) => {
  let totalItems = 0;
  cartList?.forEach((item) => {
    totalItems = totalItems + item.qty;
  });
  return totalItems;
};

const getTotalPrice = (cartList) => {
  let totalPrice = 0;
  cartList?.forEach((item) => {
    totalPrice = totalPrice + parseFloat(item.price) * item.qty;
  });
  return totalPrice;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CART_DATA:
      return {
        ...state,
        totalItems: getTotalItems(action.payload),
        totalPrice: getTotalPrice(action.payload),
        cartItems: [...action.payload],
      };
    default:
      return state;
  }
};
