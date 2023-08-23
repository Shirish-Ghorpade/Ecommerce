import React from "react";
import useFetch from "../../../hooks/useFetch";
import Products from "../../Products/Products";

const RelatedProducts = ({ categoryId, productId }) => {
  // Call ap to fetch the data
  const { data } = useFetch(
    // api call madhe `/api/products?populate=*&filters[id] ha part similar aahe SingleProduct.jsx sarkha pn
    // [$ne]=${productId} ha part add kela karan jo product varti display hotoy tho sodun baki sarv tya section madhle product disave and pagination[start]=0&pagination[limit]=4` ha me add karun realted product chi limit 4 keli aahe
    `/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`
  );

  return (
    <div className="related-products">
      <Products headingText="Related Products" products={data} />
    </div>
  );
};

export default RelatedProducts;
