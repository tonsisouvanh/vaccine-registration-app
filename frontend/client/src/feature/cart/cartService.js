import axios from "axios";

const API_URL = "http://localhost:8000/api/carts/";
const user = JSON.parse(localStorage.getItem("user"));
// Create new vaccine
const addCart = async (cartData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const response = await axios.post(API_URL + "add-cart", cartData, config);

  return response.data;
};

// vaccines
const getCart = async (userData) => {
  const { userId, token } = userData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "get-cart/" + userId, config);
  return response.data;
};


const cartService = {
  getCart,
  addCart,
};

export default cartService;
