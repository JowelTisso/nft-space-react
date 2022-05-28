import "./UserProfile.css";
import React, { useEffect } from "react";
import { useCart } from "../../context/provider/CartProvider";
import { useWishlist } from "../../context/provider/WishlistProvider";
import { useAuth } from "../../context/provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../authentication/helper/auth";
import axios from "axios";
import { getUserToken } from "../../utils/TokenHelper";
import { SET_ACTIVE_ADDRESS } from "../../utils/Constant";

const UserProfile = () => {
  const { cartDispatch } = useCart();
  const { wishlistDispatch } = useWishlist();
  const {
    authState: { user, activeAddress },
    authDispatch,
  } = useAuth();
  const navigate = useNavigate();

  // const { id, name, mobile, address, pin, city, state, landmark } =
  //   activeAddress;

  // const combinedAddress = `${activeAddress?.address || ""}, ${activeAddress?.landmark}, ${activeAddress?.city}, ${activeAddress?.state}, ${activeAddress?.pin}`;

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/user/addresses", {
        headers: { authorization: getUserToken() },
      });
      if (
        res?.status === 200 ||
        (res?.status === 201 && res?.data?.addresses.length > 0)
      ) {
        authDispatch({
          type: SET_ACTIVE_ADDRESS,
          payload: { address: res?.data?.addresses[0] || {} },
        });
      }
    })();
  }, []);

  const logoutHandler = () => {
    userLogout(authDispatch, cartDispatch, wishlistDispatch);
  };
  return (
    <div className="content-wrapper mg-top-6x pd-top-1x flex-center">
      <div className="login-card wd-5x flex-center pd-5x">
        <p className="h3 text-center mg-bottom-2x">Hello,</p>
        <p className="h3 text-center mg-bottom-4x">
          {user?.firstName} {user?.lastName}
        </p>

        <div className="input-container mg-top-2x wd-4x">
          <label className="input-label">Email</label>
          <p className="input-simple">{user?.email}</p>
        </div>

        <div className="input-container mg-top-4x wd-4x user">
          <label className="input-label">Address</label>
          <div className="toggle-icon-container">
            <p className="input-simple">
              {" "}
              Ganesguri, near dispur college, Dispur college, Guwahati, Assam
              781028
            </p>
          </div>
          <Link
            to={"/address"}
            className="btn btn-primary btn-sm no-deco mg-top-5x "
          >
            Manage Address
          </Link>
        </div>

        <div className="bottom-nav-container mg-top-6x ">
          <button
            className="btn btn-secondary btn-sm no-deco "
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export { UserProfile };
