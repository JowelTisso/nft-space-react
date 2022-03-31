import { createContext, useContext } from "react";
import { wishlistReducer } from "../reducer/wishlist/WishlistReducer";

const WishlistContext = createContext({ state: {}, dispatch: () => {} });

const WishlistProvider = ({ children }) => {
  const { state, dispatch } = wishlistReducer();

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
