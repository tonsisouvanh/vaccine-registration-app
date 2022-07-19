import axios from "axios";

const API_URL = "http://localhost:8000/api/users/";

// Create new user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// users
const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// users
const getUser = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Delete user user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + userId, config);

  return response.data;
};

const userService = {
  register,
  login,
  logout,
  getUsers,
  getUser,
  deleteUser,
};

export default userService;
