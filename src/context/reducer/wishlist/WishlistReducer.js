import { useReducer } from "react";
import { reducer } from "./wishlistReducerHelper";

export const wishlistReducer = () => {
  const defaultData = {
    wishlistItems: [],
  };
  const [state, dispatch] = useReducer(reducer, defaultData);

  return { state, dispatch };
};
