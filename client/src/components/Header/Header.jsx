import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Here is all are icons which is avaliable on react library os all required icons imported below
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import "./Header.scss";
import Search from "./Search/Search";
// importing context which is exporting from conext.js file
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const navigate = useNavigate();
  const handleScroll = () => {
    // window.scrollY; It gives the amount of scroll we done in terms of numbers
    const offset = window.scrollY;
    if (offset > 200) {
      // we can check using console.log(offset);
      // Here we use the setFunc of useState so it is react hooks see in notes
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  //useEffect is Hook in react js when componenet render 1st time useEffect get called. Here we use useEffect for making the navbar sticky when we scroll the website

  useEffect(() => {
    // when scroll event trgger then call above handleScroll func
    window.addEventListener("scroll", handleScroll);
  }, []);
  // state inside [] updates then useEffect is get called

  const { cartCount, showCart, setShowCart } = useContext(Context);

  //   Creating header section
  return (
    // here as per react rule only one container camn be return so we use <> empty fragment
    <>
      {/* Here we use conditional rendering method in React */}
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            {/* to use a map, etc. to find your way to somewhere.रस्ता शोधण्यासाठी नकाशा वगैरे वापरणे; मार्गदर्शन करणे, दिशा दाखविणे, मार्ग शोधणे, दिक्चालन करणे. */}
            {/* home var click kele ki home var navigate honar */}
            <li onClick={() => navigate("/")}>Home</li>
            {/* home var click kele ki about var navigate honar */}
            <li onClick={() => navigate("/about")}>About</li>

            {/* <li onClick={() => navigate("/Categories")}>Categories</li> */}
            <li>Categories</li>
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            APNA SHOP
          </div>
          <div className="right">
            <TbSearch onClick={() => setSearchModal(true)} />
            <AiOutlineHeart />
            {/* Card var click kele ki setShowCArt state true kar and card section open kar*/}
            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>
      {/* prop ithe pass kelay and search.jsx madhe tho prop me receive kelay */}
      {searchModal && <Search setSearchModal={setSearchModal} />}
      {/* showCart true asel tar ch Cart componenet slide ne show kar */}
      {showCart && <Cart />}
    </>
  );
};

export default Header;
