import React from "react";

const CategoryCard = ({ data: { categoryName, img } }) => {
  return (
    <div className="pointer">
      <img className="img-category" src={img} alt={categoryName} />
      <p className="t4 text-center">{categoryName}</p>
    </div>
  );
};

export default CategoryCard;
