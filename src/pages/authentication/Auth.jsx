import React, { useState } from "react";
import "./Auth.css";
import { IoEyeOff, IoChevronForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { userLogIn } from "./helper/authHelper";
import { useAuth } from "../../context/provider/AuthProvider";
import { LOG_IN } from "../../utils/Constant";

const Auth = () => {
  const [credentials, setCredentials] = useState({
    email: "test@gmail.com",
    password: "test123",
  });

  const [authTypeLogin, setAuthTypeLogin] = useState(true);

  const { authDispatch } = useAuth();
  const navigate = useNavigate();

  const emailChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, email: target.value }));
  };
  const passwordChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, password: target.value }));
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

    if (res.status === 200) {
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

  return (
    <>
      <div className="content-wrapper mg-top-6x pd-top-1x flex-center">
        <div className="login-card wd-5x flex-center pd-5x">
          <p className="h3 text-center mg-top-2x mg-bottom-4x">
            {authTypeLogin ? "Login" : "Signup"}
          </p>

          <div className="input-container mg-top-2x wd-4x">
            <label className="input-label">Email address</label>
            <input
              type="email"
              className="input-simple"
              placeholder="test@gmail.com"
              value={credentials.email}
              onChange={emailChangeHandler}
            />
            <p className="input-val val-warn">Input email</p>
          </div>

          <div className="input-container mg-top-3x wd-4x">
            <label className="input-label">Password</label>
            <div className="toggle-icon-container">
              <input
                type="password"
                className="input-simple"
                placeholder="test123"
                value={credentials.password}
                onChange={passwordChangeHandler}
              />
              <IoEyeOff className="toggle-icon pointer" />
            </div>
            <p className="input-val val-warn">Input password</p>
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
            onClick={loginHandler}
          >
            {authTypeLogin ? "Login" : "Signup"}
          </button>

          <div className="bottom-nav-container mg-top-2x ">
            <buton
              className="t4 text-center pointer no-deco btn-link"
              onClick={changeAuthType}
            >
              {authTypeLogin ? "Create New Account" : "Already have an account"}
            </buton>
            <IoChevronForward className="goto-icon mg-left-1x" />
          </div>
        </div>
      </div>
    </>
  );
};

export { Auth };
