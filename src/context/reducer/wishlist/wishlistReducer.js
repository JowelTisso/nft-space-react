import {
  CLEAR_WISHLIST,
  GET_WISHLIST_DATA,
  TOGGLE_LOADING,
  UPDATE_WISHLIST_DATA,
} from "../../../utils/Constant";

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_WISHLIST_DATA:
      return {
        ...state,
        wishlistItems: [...action.payload],
      };
    case UPDATE_WISHLIST_DATA:
      return {
        ...state,
        wishlistItems: [...action.payload],
      };
    case CLEAR_WISHLIST:
      return {
        ...state,
        wishlistItems: [],
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
