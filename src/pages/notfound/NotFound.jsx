import React from "react";

const NotFound = () => {
  return (
    <div className="empty-cart-container flex-center">
      <img
        src="https://user-images.githubusercontent.com/52632590/170713201-b529185b-362a-4b4d-8b0f-91eeb9ab71bc.png"
        alt="empty cart"
        className="empty-cart-img"
      />
      <p className="t3 mg-top-5x">Page not found!</p>
    </div>
  );
};

export default NotFound;
