import axios from "axios";
import {
  LOG_OUT,
  UPDATE_CART_DATA,
  UPDATE_WISHLIST_DATA,
  USER_TOKEN,
} from "../../../utils/Constant";
import { getUserToken } from "../../../utils/TokenHelper";

export const userLogIn = async (payload) => {
  try {
    const res = await axios.post("/api/auth/login", payload);
    if (res?.status === 200) {
      localStorage.setItem(USER_TOKEN, res.data.encodedToken);
      return res;
    }
  } catch (err) {
    console.log(err);
  }
};

export const userLogout = (dispatch) => {
  try {
    localStorage.removeItem(USER_TOKEN);
    dispatch({ type: LOG_OUT });
  } catch (err) {
    console.log(err);
  }
};

export const userSignUp = async (payload) => {
  try {
    const res = await axios.post("/api/auth/signup", payload);
    if (res?.status === 200) {
      localStorage.setItem(USER_TOKEN, res.data.encodedToken);
      return res;
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

// Wishlist
export const getWishlistDataFromServer = async (dispatch) => {
  try {
    const token = getUserToken();
    if (token) {
      const { status, data } = await axios.get("/api/user/wishlist", {
        headers: { authorization: token },
      });
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

// Cart
export const getCartDataFromServer = async (dispatch) => {
  try {
    const token = getUserToken();
    if (token) {
      const { status, data } = await axios.get("/api/user/cart", {
        headers: { authorization: token },
      });
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
