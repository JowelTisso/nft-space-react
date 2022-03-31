import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../../../utils/Constant";

export const addToWishlist = (item, dispatch) => {
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: item,
  });
};

export const removeFromWishlist = (item, dispatch) => {
  dispatch({
    type: REMOVE_FROM_WISHLIST,
    payload: item,
  });
};
