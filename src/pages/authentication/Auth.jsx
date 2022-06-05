import React, { useState } from "react";
import "./Auth.css";
import { IoEyeOff, IoChevronForward } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCartDataFromServer,
  getWishlistDataFromServer,
  userLogIn,
  userSignUp,
} from "./helper/auth";
import { useAuth } from "../../context/provider/AuthProvider";
import { LOG_IN } from "../../utils/Constant";
import { useWishlist } from "../../context/provider/WishlistProvider";
import { useCart } from "../../context/provider/CartProvider";
import { callToast } from "../../components/toast/Toast";

const Auth = () => {
  const defaultCredential = {
    firstName: "Neog",
    lastName: "camp",
    email: "test@gmail.com",
    password: "test123",
  };
  const [credentials, setCredentials] = useState(defaultCredential);

  const { firstName, lastName, email, password } = credentials;

  const [authTypeLogin, setAuthTypeLogin] = useState(true);

  const [togglePassword, setTogglePassword] = useState(false);

  const { authDispatch } = useAuth();
  const navigate = useNavigate();
  const { wishlistDispatch } = useWishlist();
  const { cartDispatch } = useCart();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, email: target.value }));
  };
  const passwordChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, password: target.value }));
  };

  const nameChangeHandler = ({ target }, nameType) => {
    setCredentials((state) => ({ ...state, [nameType]: target.value }));
  };

  const changeAuthType = () => {
    setAuthTypeLogin((state) => !state);
    setCredentials({
      email: "",
      password: "",
    });
  };

  const loginHandler = async () => {
    const res = await userLogIn({
      email: email,
      password: password,
    });
    if (res?.status === 200) {
      authDispatch({
        type: LOG_IN,
        payload: {
          token: res?.data?.encodedToken,
          user: res?.data?.foundUser,
        },
      });
      getWishlistDataFromServer(wishlistDispatch);
      getCartDataFromServer(cartDispatch);
      navigate(from, { replace: true });
      callToast("Logged in successfully!");
    }
  };

  const signupHandler = async () => {
    try {
      if ((firstName, lastName, email, password)) {
        if (email.includes("@")) {
          const res = await userSignUp({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          });
          if (res?.status === 200 || res?.status === 201) {
            setCredentials({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            });

            callToast("Sign up successfull! Login to continue!");
          }
        } else {
          callToast("Invalid email!");
        }
      } else {
        callToast("All fields are required!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showPassword = () => {
    setTogglePassword((state) => !state);
  };

  const fillTestCredential = () => {
    setCredentials(defaultCredential);
  };

  return (
    <div className="content-wrapper mg-top-6x pd-top-1x flex-center">
      <div className="login-card wd-5x flex-center pd-5x">
        <p className="h3 text-center mg-top-2x mg-bottom-4x">
          {authTypeLogin ? "Login" : "Signup"}
        </p>

        {!authTypeLogin && (
          <>
            <div className="input-container mg-top-2x wd-4x">
              <label className="input-label">First Name</label>
              <input
                type="text"
                className="input-simple"
                placeholder="Neog"
                value={firstName}
                onChange={(e) => nameChangeHandler(e, "firstName")}
              />
            </div>
            <div className="input-container mg-top-2x wd-4x">
              <label className="input-label">Last Name</label>
              <input
                type="text"
                className="input-simple"
                placeholder="camp"
                value={lastName}
                onChange={(e) => nameChangeHandler(e, "lastName")}
              />
            </div>
          </>
        )}

        <div className="input-container mg-top-2x wd-4x">
          <label className="input-label">Email address</label>
          <input
            type="email"
            className="input-simple"
            placeholder="test@gmail.com"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>

        <div className="input-container mg-top-2x wd-4x">
          <label className="input-label">Password</label>
          <div className="toggle-icon-container">
            <input
              type={togglePassword ? "text" : "password"}
              className="input-simple"
              placeholder="test123"
              value={password}
              onChange={passwordChangeHandler}
            />
            <div onClick={showPassword}>
              <IoEyeOff className="toggle-icon pointer" />
            </div>
          </div>
        </div>

        <div className="info-container flex-center mg-2x wd-4x">
          <div>
            <input type="checkbox" className="checkbox" />
            <label className="t4 mg-left-1x">
              {authTypeLogin
                ? "Remember me"
                : "I accept all Terms and Conditions"}
            </label>
          </div>
          {authTypeLogin && (
            <button className="btn-link btn-link-secondary t4">
              Forgot your password?
            </button>
          )}
        </div>

        <button
          className="btn btn-primary wd-full mg-top-2x"
          onClick={() => {
            authTypeLogin ? loginHandler() : signupHandler();
          }}
        >
          {authTypeLogin ? "Login" : "Create New Account"}
        </button>

        <div
          className={`bottom-nav-container mg-top-2x ${
            authTypeLogin && "justify-space-between"
          }`}
        >
          {authTypeLogin && (
            <button
              className="t4 text-center pointer no-deco btn-link"
              onClick={fillTestCredential}
            >
              Test credential
            </button>
          )}
          <span className="bottom-right-btn flex-center">
            <button
              className="t4 text-center pointer no-deco btn-link"
              onClick={changeAuthType}
            >
              {authTypeLogin ? "Create New Account" : "Already have an account"}
            </button>
            <IoChevronForward className="goto-icon" />
          </span>
        </div>
      </div>
    </div>
  );
};

export { Auth };
