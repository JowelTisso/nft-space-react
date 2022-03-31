import React from "react";
import logo from "../../assets/logo.png";
import {
  IoHeartOutline,
  IoCartOutline,
  IoSearchOutline,
} from "react-icons/io5";
import "./Header.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/provider/CartProvider";
import { useWishlist } from "../../context/provider/WishlistProvider";

const Header = () => {
  const { cartState } = useCart();
  const { wishlistState } = useWishlist();
  return (
    <header className="header-container pd-1x pd-right-4x pd-left-4x">
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
        <Link to={"/"} className="h3 mg-left-1x pointer logo-title no-deco">
          SPACE
        </Link>
      </div>
      <div className="header-middle">
        <div className="input-container search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" className="input-simple" placeholder="Search" />
        </div>
      </div>

      <nav className="nav-container">
        <Link to={"/auth"} className="btn btn-primary btn-sm no-deco btn-login">
          Login
        </Link>
        <div className="pointer search-icon">
          <a>
            <IoSearchOutline className="ic-normal" />
          </a>
        </div>
        <div className="badge-container pointer mg-left-4x">
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
        {/* <div className="pointer login-icon">
          <Link to={"/logout"}>
            <IoLogInOutline className="ic-normal" />
          </Link>
        </div> */}
      </nav>
    </header>
  );
};

export default Header;
