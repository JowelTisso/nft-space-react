import { useReducer } from "react";
import { reducer } from "./authReducerHelper";

export const authReducer = () => {
  const defaultData = {
    token: "",
    user: {},
    loggedIn: false,
  };
  const [state, dispatch] = useReducer(reducer, defaultData);

  return { state, dispatch };
};
