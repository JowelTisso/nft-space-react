import axios from "axios";
import { UPDATE_WISHLIST_DATA, TOGGLE_LOADING } from "../../../utils/Constant";
import { getUserToken } from "../../../utils/TokenHelper";

export const addToWishlist = async (item, dispatch) => {
  try {
    dispatch({
      type: TOGGLE_LOADING,
      payload: true,
    });
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
      if (status === 200 || status === 201) {
        dispatch({
          type: UPDATE_WISHLIST_DATA,
          payload: data?.wishlist,
        });
      }
    }
    dispatch({
      type: TOGGLE_LOADING,
      payload: false,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: TOGGLE_LOADING,
      payload: false,
    });
  }
};

export const removeFromWishlist = async (item, dispatch) => {
  try {
    dispatch({
      type: TOGGLE_LOADING,
      payload: true,
    });
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
    dispatch({
      type: TOGGLE_LOADING,
      payload: false,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: TOGGLE_LOADING,
      payload: false,
    });
  }
};
