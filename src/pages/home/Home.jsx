import React, { useState, useEffect } from "react";
import "./Home.css";
import CategoryCard from "./component/CategoryCard";
import axios from "axios";
import Header from "../../components/header/Header";
import { Link, useNavigate } from "react-router-dom";
import CategoryCardHorizontal from "./component/CategoryCardHorizontal";
import { TrendingStatusData } from "../../utils/HomeTrendingStatusData";

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
              {categories.map((data, i) => (
                <div
                  to={"/products"}
                  className="basic-link"
                  onClick={() => {
                    navigateTo("products", { category: data.categoryName });
                  }}
                  key={i}
                >
                  <CategoryCard data={data} />
                </div>
              ))}
            </div>
          </div>

          <Link to={"/products"} className="carousel mg-top-2x">
            <img
              className="img-carousel pointer"
              src="https://user-images.githubusercontent.com/52632590/153457954-a3cb3152-bfde-42db-bb34-e113825757d9.png"
              alt="Carousel"
            />
          </Link>

          <div className="category-card-container mg-1x mg-top-6x">
            {TrendingStatusData.map(({ img, status, description }) => (
              <CategoryCardHorizontal
                img={img}
                title={status}
                description={description}
                key={status}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export { Home };
