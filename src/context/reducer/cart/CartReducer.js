import { useReducer } from "react";
import { reducer } from "./cartReducerHelper";

export const cartReducer = () => {
  const defaultData = {
    totalItems: 0,
    totalPrice: 0,
    cartItems: [],
  };
  const [state, dispatch] = useReducer(reducer, defaultData);

  return { state, dispatch };
};
