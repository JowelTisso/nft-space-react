import { ADD_TO_CART, REMOVE_FROM_CART } from "../../../utils/Constant";

export const addToCart = (item, dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: item,
  });
};

export const removeFromCart = (item, dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: item,
  });
};
