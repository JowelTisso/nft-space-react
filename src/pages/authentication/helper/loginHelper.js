import axios from "axios";
import { USER_TOKEN } from "../../../utils/Constant";

export const userLogIn = async (payload) => {
  try {
    const res = await axios.post("/api/auth/login", payload);
    if (res.status === 200) {
      localStorage.setItem(USER_TOKEN, JSON.stringify(res.data.encodedToken));
      return res;
    }
  } catch (err) {
    console.log(err);
  }
};
