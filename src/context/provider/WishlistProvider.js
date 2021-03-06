import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducer/wishlist/wishlistReducer";

const WishlistContext = createContext({ state: {}, dispatch: () => {} });

const WishlistProvider = ({ children }) => {
  const defaultData = {
    wishlistItems: [],
    isLoading: false,
  };
  const [state, dispatch] = useReducer(reducer, defaultData);

  return (
    <WishlistContext.Provider
      value={{ wishlistState: state, wishlistDispatch: dispatch }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
