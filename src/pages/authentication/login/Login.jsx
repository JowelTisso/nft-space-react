import React from "react";
import Header from "../../../components/header/Header";
import "../Auth.css";
import { IoEyeOff, IoChevronForward } from "react-icons/io5";

const Login = () => {
  return (
    <>
      <Header />
      <div className="content-wrapper mg-top-6x pd-top-1x flex-center">
        <div className="login-card wd-5x flex-center pd-5x">
          <p className="h3 text-center mg-top-2x mg-bottom-4x">Login</p>

          <div className="input-container mg-top-2x wd-4x">
            <label className="input-label">Email address</label>
            <input
              type="email"
              className="input-simple"
              placeholder="neog@gmail.com"
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

          <button className="btn btn-primary wd-full mg-top-2x">Login</button>

          <div className="bottom-nav-container mg-top-2x">
            <a
              href="../signup/signup.html"
              className="t4 text-center pointer no-deco"
            >
              Create New Account
            </a>
            <IoChevronForward className="goto-icon mg-left-1x" />
          </div>
        </div>
      </div>
    </>
  );
};

export { Login };
