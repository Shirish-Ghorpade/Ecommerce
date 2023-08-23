import axios from "axios";

const params = {
  headers: {
    // adding key ji stripe madun copy keli hoti ti using .env file
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
};

// ha func export karnar jevha pn data fetch karayla lagnar, ji url pahije ti ithe pass karnar
export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(
      process.env.REACT_APP_STRIPE_APP_DEV_URL + url,
      params
    );
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const makePaymentRequest = axios.create({
  baseURL: process.env.REACT_APP_STRIPE_APP_DEV_URL,
  headers: {
    Authorization: "bearer " + process.env.REACT_APP_STRIPE_DEV_APP_KEY,
  },
});
