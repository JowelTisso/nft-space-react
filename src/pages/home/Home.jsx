import React, { useState, useEffect } from "react";
import "./Home.css";
import CategoryCard from "./component/CategoryCard";
import axios from "axios";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import CategoryCardHorizontal from "./component/CategoryCardHorizontal";

const Home = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const navigateTo = (to, payload) => {
    navigate(`/${to}`, { state: payload });
  };

  useEffect(() => {
    (async () => {
      try {
        const { status, data } = await axios.get("/api/categories/");
        status === 200 && setCategories(data.categories);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <div className="wrapper mg-top-6x">
        <main className="pd-5x pd-top-2x">
          <div className="row-category-container hide-scroll">
            <div className="scroll pd-1x">
              {categories.map((data, index) => (
                <div
                  to={"/products"}
                  className="basic-link"
                  onClick={() => {
                    navigateTo("products", { category: data.categoryName });
                  }}
                >
                  <CategoryCard data={data} key={index} />
                </div>
              ))}
            </div>
          </div>

          <div className="carousel mg-top-2x">
            <img
              className="img-carousel pointer"
              src="https://user-images.githubusercontent.com/52632590/153457954-a3cb3152-bfde-42db-bb34-e113825757d9.png"
              alt="Carousel"
            />
          </div>

          <div className="category-card-container mg-6x mg-top-6x">
            <CategoryCardHorizontal
              img="https://i.pinimg.com/736x/f3/17/c0/f317c046fc27f52bd4398d9fcc0a0272.jpg"
              title="Popular"
              description=" NFT that are popular this year, which will lead you in
                    discovering cool nfts."
            />
            <CategoryCardHorizontal
              img="https://i.pinimg.com/originals/1a/72/88/1a72888549a53fc0726a4dfc5eef6626.gif"
              title="Trending"
              description="NFT that are trending this year, which will lead you in
                    discovering cool nfts."
            />
          </div>
        </main>
      </div>
    </>
  );
};

export { Home };
