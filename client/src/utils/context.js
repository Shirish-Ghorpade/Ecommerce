import { useEffect } from "react";
// Import createContext, useState from react
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

//Invoke the context and export it for using in different files
export const Context = createContext();

// Create AppContext component and props children so check the file app.js so there is AppContext tag so all components inside it is the children so use that all componenet using children
// so here we craete the all global states that required in this project
// me ithe all state create kelya and aata globally avaliable karnar <Context.Provider ne see this in below code
// data access karnaya sathi jya file madhe pahije tithe me useContext import karnar
const AppContext = ({ children }) => {
  // carts che sarv useState banvle and khali pass kele Context.Provider madhe so aapan throughout the application te use karu shakto
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  // url chi location access keli
  const location = useLocation();

  // location jar change zali tar tyla set kar window.scrollTo(0, 0); so every page var header sticky bhetel
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    // ya lines ne me cart madhe asleli sarv quantity chi count kadli
    let count = 0;
    cartItems?.map((item) => (count += item.attributes.quantity));
    // total quantity setCartCount(count); madhe update keli
    // ha kahli use kela aahe total cart chi quantity dakhvayla
    setCartCount(count);

    // Ithe tyachi total price kadli
    let subTotal = 0;
    cartItems.map(
      (item) => (subTotal += item.attributes.price * item.attributes.quantity)
    );
    // setting the subtotal in setCartSubTotal cart
    setCartSubTotal(subTotal);
  }, [cartItems]);

  // Card madhe add button handle kele
  const handleAddToCart = (product, quantity) => {
    // item madhe cartItem la access kela
    // ithe ...(seraed use kelay see afterwards) ---> Spread syntax can be used when all elements from an object or array need to be included in a new array or object, or should be applied one-by-one in a function call's arguments list.
    let items = [...cartItems];
    // index madhe tya tyachi product id kadli konachi jyala me aata add kartoy tyachi
    let index = items?.findIndex((p) => p.id === product?.id);
    // jar tho adich exist karto tar cart madhe tar prev quantity madhe new qunatity add kar
    if (index !== -1) {
      items[index].attributes.quantity += quantity;
    } else {
      // jar cart madhe nasel tar varchi props vali quntity assign kar
      product.attributes.quantity = quantity;
      // items madhe tya product la add kar
      items = [...items, product];
    }
    // items madhe product add kele aata setCartItems(items)
    setCartItems(items);
  };

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items?.filter((p) => p.id !== product?.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    // same as above
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    // inc zala aahe tar (inc is type of increment function) += 1 kar
    if (type === "inc") {
      items[index].attributes.quantity += 1;
    } else if (type === "dec") {
      // inc zala aahe tar (inc is type of increment function) += 1 kar
      if (items[index].attributes.quantity === 1) return;
      // 1 peksha jast asel tarch subtract kar
      items[index].attributes.quantity -= 1;
    }
    // updatev kela setCartItems(items);
    setCartItems(items);
  };

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        cartItems,
        setCartItems,
        handleAddToCart,
        cartCount,
        handleRemoveFromCart,
        showCart,
        setShowCart,
        handleCartProductQuantity,
        cartSubTotal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// export AppContext
export default AppContext;
