import axios from "axios";
import { LOG_OUT, USER_TOKEN } from "../../../utils/Constant";

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
