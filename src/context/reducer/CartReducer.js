import { useReducer } from "react";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from "../../utils/Constant";
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
