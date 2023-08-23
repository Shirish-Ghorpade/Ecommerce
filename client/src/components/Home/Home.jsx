import React, { useEffect, useContext } from "react";
import "./Home.scss";
// importing banner page in home page
import Banner from "./Banner/Banner";
// importing category page in home page
import Category from "./Category/Category";
import Products from "../Products/Products";
// Importing api.js file for fetching the data
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {
  // sarv me getProducts();  getCategories(); acess kartoy and roducts, setProducts, categories, setCategories ya madhe thevtoy
  // this all are objects {}
  const { products, setProducts, categories, setCategories } =
    useContext(Context);
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  // fetch data of products
  const getProducts = () => {
    fetchDataFromApi("/api/products?populate=*").then((res) => {
      setProducts(res);
    });
  };
  // fetch the api of categery sectionand this will call in above useEffect func
  const getCategories = () => {
    // /api/categories --> Use to fetch data and /api/categories?populate=* --> for fetch all data in strapi including img also
    fetchDataFromApi("/api/categories?populate=*").then((res) => {
      setCategories(res);
      // console.log(res);
    });
  };

  return (
    <div>
      {/*setting banner componenet */}
      <Banner />
      <div className="main-content">
        {/* setting the category and products componenet */}
        <div className="layout">
          <Category categories={categories} />
          <Products headingText="Popular Products" products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
