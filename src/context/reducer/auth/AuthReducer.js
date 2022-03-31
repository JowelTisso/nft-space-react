import { useReducer } from "react";
import { reducer } from "./authReducerHelper";

export const authReducer = () => {
  const defaultData = {
    token: "",
    user: {},
  };
  const [state, dispatch] = useReducer(reducer, defaultData);

  return { state, dispatch };
};
