import React from "react";

const CategoryCardHorizontal = ({ img, title, description }) => {
  return (
    <div className="card card-horizontal pointer">
      <img className="card-img-horizontal" src={img} alt="card image" />
      <div className="card-content-horizontal">
        <div className="card-content">
          <p className="card-title t3">{title}</p>
          <p className="card-sub-title t4">category</p>
          <p className="t4">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCardHorizontal;
