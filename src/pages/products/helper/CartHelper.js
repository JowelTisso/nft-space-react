import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from "../../../utils/Constant";

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
export const increaseQuantity = (item, dispatch) => {
  dispatch({
    type: INCREASE_QUANTITY,
    payload: item,
  });
};
export const decreaseQuantity = (item, dispatch) => {
  dispatch({
    type: DECREASE_QUANTITY,
    payload: item,
  });
};
