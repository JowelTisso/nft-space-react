import { useReducer, useEffect } from "react";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../utils/Constant";

export const cartReducer = () => {
  const addToCart = (state, action) => {
    // console.log(state);
    const itemIndex = state.cartItems.findIndex(
      (item) => item.cartItem._id === action.payload._id
    );
    if (itemIndex < 0) {
      return [
        ...state.cartItems.concat({ quantity: 1, cartItem: action.payload }),
      ];
    } else {
      // console.log(state.cartItems[itemIndex].quantity);
      // console.log("quantity increased");
      // console.log(state.cartItems[itemIndex].quantity);
      console.log(state.cartItems[itemIndex].quantity + "+" + 1);
      state.cartItems[itemIndex].quantity =
        state.cartItems[itemIndex].quantity + 1;

      return [...state.cartItems];
    }
  };

  useEffect(() => {
    console.log("effect");
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + parseFloat(action.payload.price),
          cartItems: addToCart(state, action),
        };
      case REMOVE_FROM_CART:
        return {
          ...state,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - parseFloat(action.payload.price),
          cartItems: state.cartItems.filter((item) => item != action.payload),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    totalItems: 0,
    totalPrice: 0,
    cartItems: [],
  });

  return { state, dispatch };
};
