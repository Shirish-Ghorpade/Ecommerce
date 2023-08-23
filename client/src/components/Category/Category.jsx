// useParams for fetching the id from URL
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Products from "../Products/Products";
import "./Category.scss";
// here we fetch the images from strapi
const Category = () => {
  const { id } = useParams();
  const { data } = useFetch(
    // fetching data
    `/api/products?populate=*&[filters][categories][id]=${id}`
  );
  return (
    <div className="category-main-content">
      <div className="layout">
        <div className="category-title">
          {
            data?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes
              ?.title
          }
        </div>
        <Products innerPage={true} products={data} />
      </div>
    </div>
  );
};

export default Category;
