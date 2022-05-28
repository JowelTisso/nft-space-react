import React from "react";
import { useNavigate } from "react-router-dom";

const Empty = () => {
  const navigate = useNavigate();
  const goToProduct = () => {
    navigate("/products");
  };
  return (
    <div className="empty-cart-container flex-center">
      <img
        src="https://user-images.githubusercontent.com/52632590/170713201-b529185b-362a-4b4d-8b0f-91eeb9ab71bc.png"
        alt="empty cart"
        className="empty-cart-img"
      />
      <button className="btn btn-primary mg-top-5x" onClick={goToProduct}>
        Shop now
      </button>
    </div>
  );
};

export default Empty;
