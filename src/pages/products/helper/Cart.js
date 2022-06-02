import axios from "axios";
import { UPDATE_CART_DATA } from "../../../utils/Constant";
import { getUserToken } from "../../../utils/TokenHelper";
import { addToWishlist } from "./Wishlist";

export const addToCart = async (item, dispatch) => {
  try {
    const token = getUserToken();
    if (token) {
      const { status, data } = await axios.post(
        "/api/user/cart",
        {
          product: item,
        },
        {
          headers: { authorization: token },
        }
      );
      if (status === 200 || 201) {
        dispatch({
          type: UPDATE_CART_DATA,
          payload: data?.cart,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const removeFromCart = async (item, dispatch) => {
  try {
    const token = getUserToken();
    if (token) {
      const { status, data } = await axios.delete(
        `/api/user/cart/${item._id}`,
        {
          headers: { authorization: token },
        }
      );
      if (status === 200 || 201) {
        dispatch({
          type: UPDATE_CART_DATA,
          payload: data?.cart,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const changeQuantity = async (item, dispatch, type) => {
  try {
    const token = getUserToken();
    if (token) {
      const { status, data } = await axios.post(
        `/api/user/cart/${item._id}`,
        {
          action: { type: type },
        },
        {
          headers: { authorization: token },
        }
      );
      if (status === 200 || 201) {
        dispatch({
          type: UPDATE_CART_DATA,
          payload: data?.cart,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const moveToWishlist = async (item, cartDispatch, wishlistDispatch) => {
  await removeFromCart(item, cartDispatch);
  await addToWishlist(item, wishlistDispatch);
};
