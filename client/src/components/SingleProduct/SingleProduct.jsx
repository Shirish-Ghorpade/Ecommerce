import { useContext, useState } from "react";
import { Context } from "../../utils/context";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";

const SingleProduct = () => {
  // quantity che button aahe so te set kele aahe using this below state intially value 1 rahil
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  // destruct method from context using useContext state
  const { handleAddToCart } = useContext(Context);
  // * for all images and & for filters get from data from id
  const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);

  const decrement = () => {
    setQuantity((prevState) => {
      // prevState madhe useState chi prev value aste
      // jar 1 asel tar 1 che thev otherwise -1 kar
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };
  const increment = () => {
    // prevState madhe useState chi prev value aste
    setQuantity((prevState) => prevState + 1);
  };

  // data jar undefined asel tar direct return kar
  if (!data) return;
  // single product cha sarv data ithe access kela in const product object and khali access kela
  const product = data?.data?.[0]?.attributes;
  // console.log(product);

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          {/* div left for the image section */}
          <div className="left">
            <img
              src={
                process.env.REACT_APP_STRIPE_APP_DEV_URL +
                product.img.data[0].attributes.url
              }
            />
          </div>
          {/* div right is for the content and info of product section */}
          <div className="right">
            {/* product che details access kele */}
            <span className="name">{product.title}</span>
            <span className="price">&#8377;{product.price}</span>
            <span className="desc">{product.desc}</span>

            {/* button of cart page */}
            <div className="cart-buttons">
              <div className="quantity-buttons">
                {/* addding - sign */}
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                {/* addding + sign */}
                <span onClick={increment}>+</span>
              </div>
              {/* add to cart button */}
              <button
                className="add-to-cart-button"
                onClick={() => {
                  // handleToCart(shopping card) madhe product and quntity send keli so aata slidebr madhe pn diste te ya mule diste
                  handleAddToCart(data?.data?.[0], quantity);
                  // cart madhe add zale ki parat quantity 1 set kar
                  setQuantity(1);
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>

            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                Category:{" "}
                <span>{product.categories.data[0].attributes.title}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>
        {/* adding related componenet */}
        <RelatedProducts
          // Passing props to the RelatedProducts
          productId={id}
          categoryId={product.categories.data[0].id}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
