import { createContext, useContext } from "react";
import { cartReducer } from "../reducer/CartReducer";

const CartContext = createContext({ state: {}, dispatch: () => {} });

const CartProvider = ({ children }) => {
  const { state, dispatch } = cartReducer();

  return (
    <CartContext.Provider value={{ cartState: state, cartDispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
