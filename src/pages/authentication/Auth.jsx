import React, { useState } from "react";
import "./Auth.css";
import { IoEyeOff, IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { userLogIn } from "./helper/loginHelper";

const Auth = () => {
  const [credentials, setCredentials] = useState({
    email: "test@gmail.com",
    password: "test123",
  });

  const emailChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, email: target.value }));
  };
  const passwordChangeHandler = ({ target }) => {
    setCredentials((state) => ({ ...state, password: target.value }));
  };

  const loginHandler = async () => {
    const res = await userLogIn({
      email: credentials.email,
      password: credentials.password,
    });
    console.log(res);
  };

  return (
    <>
      <div className="content-wrapper mg-top-6x pd-top-1x flex-center">
        <div className="login-card wd-5x flex-center pd-5x">
          <p className="h3 text-center mg-top-2x mg-bottom-4x">Login</p>

          <div className="input-container mg-top-2x wd-4x">
            <label className="input-label">Email address</label>
            <input
              type="email"
              className="input-simple"
              placeholder="neog@gmail.com"
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
                placeholder="*******"
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
              <label className="t4 mg-left-1x">Remember me</label>
            </div>
            <button className="btn-link btn-link-secondary t4">
              Forgot your password?
            </button>
          </div>

          <button
            className="btn btn-primary wd-full mg-top-2x"
            onClick={loginHandler}
          >
            Login
          </button>

          <div className="bottom-nav-container mg-top-2x ">
            <Link to={"/"} className="t4 text-center pointer no-deco btn-link">
              Create New Account
            </Link>
            <IoChevronForward className="goto-icon mg-left-1x" />
          </div>
        </div>
      </div>
    </>
  );
};

export { Auth };
