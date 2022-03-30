import { useReducer } from "react";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../utils/Constant";

export const cartReducer = () => {
  const addToCart = (state, action) => {
    const itemIndex = state.cartItems.findIndex(
      (item) => item.cartItem._id === action.payload._id
    );
    if (itemIndex < 0) {
      return [...state.cartItems].concat({
        quantity: 1,
        cartItem: action.payload,
      });
    } else {
      state.cartItems[itemIndex].quantity =
        state.cartItems[itemIndex].quantity + 1;

      return [...state.cartItems];
    }
  };

  const decreaseQuantity = (state, action) => {
    const itemIndex = state.cartItems.findIndex(
      (item) => item.cartItem._id === action.payload._id
    );
    if (itemIndex > -1) {
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity =
          state.cartItems[itemIndex].quantity - 1;
        return {
          ...state,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - parseFloat(action.payload.price),
          cartItems: [...state.cartItems],
        };
      } else {
        return {
          ...state,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - parseFloat(action.payload.price),
          cartItems: [...state.cartItems].filter(
            (item) => item.cartItem._id != action.payload._id
          ),
        };
      }
    }
  };

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
          totalItems: state.totalItems - action.payload.quantity,
          totalPrice:
            state.totalPrice -
            parseFloat(action.payload.cartItem.price) * action.payload.quantity,
          cartItems: [...state.cartItems].filter(
            (item) => item.cartItem._id != action.payload.cartItem._id
          ),
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
