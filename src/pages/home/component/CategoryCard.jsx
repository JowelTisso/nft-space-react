import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ data: { categoryName, img } }) => {
  return (
    <div className="pointer">
      <Link to={"/products"}>
        <img className="img-category" src={img} alt={categoryName} />
      </Link>
      <p className="t4 text-center">{categoryName}</p>
    </div>
  );
};

export default CategoryCard;
