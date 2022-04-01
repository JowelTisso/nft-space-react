import React, { useState } from "react";
import "./Auth.css";
import { IoEyeOff, IoChevronForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { userLogIn, userSignUp } from "./helper/authHelper";
import { useAuth } from "../../context/provider/AuthProvider";
import { LOG_IN, SIGN_UP } from "../../utils/Constant";

const Auth = () => {
  const [credentials, setCredentials] = useState({
    firstName: "Neog",
    lastName: "camp",
    email: "test@gmail.com",
    password: "test123",
  });

  const [authTypeLogin, setAuthTypeLogin] = useState(true);

  const [togglePassword, setTogglePassword] = useState(false);

  const { authDispatch } = useAuth();
  const navigate = useNavigate();

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
      email: credentials.email,
      password: credentials.password,
    });
    if (res?.status === 200) {
      authDispatch({
        type: LOG_IN,
        payload: {
          token: res?.data?.encodedToken,
          user: res?.data?.foundUser,
        },
      });
      navigate("/");
    }
  };

  const signupHandler = async () => {
    const res = await userSignUp({
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      password: credentials.password,
    });
    if (res?.status === 200) {
      authDispatch({
        type: SIGN_UP,
        payload: {
          token: res?.data?.encodedToken,
          user: res?.data?.createdUser,
        },
      });
      navigate("/");
    }
  };

  const showPassword = () => {
    setTogglePassword((state) => !state);
  };

  console.log(process.env);

  return (
    <>
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
                  value={credentials.firstName}
                  onChange={(e) => nameChangeHandler(e, "firstName")}
                />
                {/* <p className="input-val val-warn">Input email</p> */}
              </div>
              <div className="input-container mg-top-2x wd-4x">
                <label className="input-label">Last Name</label>
                <input
                  type="text"
                  className="input-simple"
                  placeholder="camp"
                  value={credentials.lastName}
                  onChange={(e) => nameChangeHandler(e, "lastName")}
                />
                {/* <p className="input-val val-warn">Input email</p> */}
              </div>
            </>
          )}

          <div className="input-container mg-top-2x wd-4x">
            <label className="input-label">Email address</label>
            <input
              type="email"
              className="input-simple"
              placeholder="test@gmail.com"
              value={credentials.email}
              onChange={emailChangeHandler}
            />
            {/* <p className="input-val val-warn">Input email</p> */}
          </div>

          <div className="input-container mg-top-2x wd-4x">
            <label className="input-label">Password</label>
            <div className="toggle-icon-container">
              <input
                type={togglePassword ? "text" : "password"}
                className="input-simple"
                placeholder="test123"
                value={credentials.password}
                onChange={passwordChangeHandler}
              />
              <div onClick={showPassword}>
                <IoEyeOff className="toggle-icon pointer" />
              </div>
            </div>
            {/* <p className="input-val val-warn">Input password</p> */}
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

          <div className="bottom-nav-container mg-top-2x ">
            <button
              className="t4 text-center pointer no-deco btn-link"
              onClick={changeAuthType}
            >
              {authTypeLogin ? "Create New Account" : "Already have an account"}
            </button>
            <IoChevronForward className="goto-icon mg-left-1x" />
          </div>
        </div>
      </div>
    </>
  );
};

export { Auth };
