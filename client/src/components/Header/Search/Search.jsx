import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Search = ({ setSearchModal }) => {
  // useSatte ne query, setQuery banvle
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    // varcha form chnge hot asel tar setQuery kar therefore onChange is used
    // query la set kele
    setQuery(e.target.value);
  };

  // api call madhun data fetch kela
  let { data } = useFetch(
    `/api/products?populate=*&filters[title][$contains]=${query}`
  );

  if (!query.length) {
    // query nasel tar data null thev
    data = null;
  }

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          // autofocus manje page load zala ki cursor ithe disnar blink hotana
          autoFocus
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={onChange}
        />
        <MdClose className="close-btn" onClick={() => setSearchModal(false)} />
      </div>
      <div className="search-result-content">
        {!data?.data?.length && (
          <div className="start-msg">
            Start typing to see products you are looking for.
          </div>
        )}
        <div className="search-results">
          {data?.data?.map((item) => (
            <div
              className="search-result-item"
              key={item.id}
              onClick={() => {
                navigate("/product/" + item.id);
                // product select kela tya list madun tar setSearchModal(); la false set kar
                setSearchModal(false);
              }}
            >
              <div className="image-container">
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                    item.attributes.img.data[0].attributes.url
                  }
                />
              </div>
              <div className="prod-details">
                <span className="name">{item.attributes.title}</span>
                <span className="desc">{item.attributes.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
