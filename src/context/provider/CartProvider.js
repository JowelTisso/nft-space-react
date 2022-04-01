import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/cart/cartReducerHelper";

const CartContext = createContext({ state: {}, dispatch: () => {} });

const CartProvider = ({ children }) => {
  const defaultData = {
    totalItems: 0,
    totalPrice: 0,
    cartItems: [],
  };
  const [state, dispatch] = useReducer(reducer, defaultData);

  return (
    <CartContext.Provider value={{ cartState: state, cartDispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
