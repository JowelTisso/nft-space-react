import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../../../utils/Constant";

const addToWishlist = (state, action) => {
  const itemIndex = state.wishlistItems.findIndex(
    (item) => item._id === action.payload._id
  );
  if (itemIndex < 0) {
    return [...state.wishlistItems].concat(action.payload);
  }
  return [...state.wishlistItems];
};

const removeFromWishlist = (state, action) =>
  [...state.wishlistItems].filter((item) => item._id != action.payload._id);

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlistItems: addToWishlist(state, action),
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistItems: removeFromWishlist(state, action),
      };
    default:
      return state;
  }
};
