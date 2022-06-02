import React, { useState } from "react";
import logo from "../../assets/logo.png";
import {
  IoHeartOutline,
  IoCartOutline,
  IoMenu,
  IoLogOutOutline,
  IoSearchOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import "./Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/provider/CartProvider";
import { useWishlist } from "../../context/provider/WishlistProvider";
import { useAuth } from "../../context/provider/AuthProvider";
import { userLogout } from "../../pages/authentication/helper/auth";
import { useSidenav } from "../../context/provider/SidenavProvider";
import { PRODUCT_DATA, TOGGLE_NAV } from "../../utils/Constant";
import { useFilter } from "../../context/provider/FilterProvider";
import { filterByTitle } from "./headerHelper";
import SearchInput from "./components/SearchInput";

const Header = () => {
  const [isSearchVisivle, setIsSearchVisivle] = useState(false);
  const { cartState, cartDispatch } = useCart();
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { authState, authDispatch } = useAuth();
  const navigate = useNavigate();
  const { sidenavDispatch } = useSidenav();
  const location = useLocation();
  const { filterDispatch, products } = useFilter();

  const currentRoute = location?.pathname;
  const productRoute = "/products";
  const userRoute = "/user-profile";

  const logoutHandler = () => {
    userLogout(authDispatch, cartDispatch, wishlistDispatch);
    navigate("/");
  };

  const toggleSidenav = () => {
    sidenavDispatch({ type: TOGGLE_NAV });
  };

  const applySearch = ({ key, target }) => {
    if (key === "Enter") {
      const filteredBySearch = filterByTitle(target.value, products);
      filterDispatch({ type: PRODUCT_DATA, payload: filteredBySearch });
    }
  };

  const toggleSearchInput = () => {
    setIsSearchVisivle((isVisible) => !isVisible);
  };

  return (
    <header className="header-container pd-1x pd-right-4x pd-left-4x">
      {currentRoute === productRoute && (
        <div className="header-menu-mb" onClick={toggleSidenav}>
          <IoMenu className="ic-normal" />
        </div>
      )}
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
        <Link to={"/"} className="h3 mg-left-1x pointer logo-title no-deco">
          SPACE
        </Link>
      </div>
      <div className={`header-middle ${isSearchVisivle && "show-in-mb"} `}>
        {currentRoute === productRoute && (
          <>
            <SearchInput applySearch={applySearch} />
            <div className="search-backdrop" onClick={toggleSearchInput}></div>
          </>
        )}
      </div>
      <nav className="nav-container">
        {currentRoute !== userRoute && (
          <>
            {authState.loggedIn ? (
              <button
                className="btn btn-secondary btn-sm no-deco btn-login"
                onClick={logoutHandler}
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/auth"}
                className="btn btn-primary btn-sm no-deco btn-login"
              >
                Login
              </Link>
            )}
          </>
        )}

        <div className="badge-container pointer mg-left-4x">
          {currentRoute === productRoute && (
            <IoSearchOutline
              className="ic-normal search-icon-mb"
              onClick={toggleSearchInput}
            />
          )}
          <Link to={"/wishlist"}>
            <IoHeartOutline className="ic-normal" />
          </Link>
          <p className="badge bdg-s bdg-ic bdg-ic-t">
            {wishlistState?.wishlistItems?.length}
          </p>
        </div>
        <div className="badge-container pointer mg-left-4x">
          <Link to={"/cart"}>
            <IoCartOutline className="ic-normal" />
          </Link>
          <p className="badge bdg-s bdg-ic bdg-ic-t">
            {cartState?.cartItems?.length}
          </p>
        </div>
        <Link to={"/user-profile"} className="user-icon-container">
          <IoPersonCircleOutline className="ic-normal" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
