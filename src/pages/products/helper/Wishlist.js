import axios from "axios";
import { UPDATE_WISHLIST_DATA } from "../../../utils/Constant";
import { getUserToken } from "../../../utils/TokenHelper";

export const addToWishlist = async (item, dispatch) => {
  try {
    const token = getUserToken();
    if (token) {
      const { status, data } = await axios.post(
        "/api/user/wishlist",
        {
          product: item,
        },
        {
          headers: { authorization: token },
        }
      );
      if (status === 200 || 201) {
        dispatch({
          type: UPDATE_WISHLIST_DATA,
          payload: data?.wishlist,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeFromWishlist = async (item, dispatch) => {
  try {
    const token = getUserToken();
    if (token) {
      const { status, data } = await axios.delete(
        `/api/user/wishlist/${item._id}`,
        {
          headers: { authorization: token },
        }
      );
      if (status === 200 || 201) {
        dispatch({
          type: UPDATE_WISHLIST_DATA,
          payload: data?.wishlist,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
