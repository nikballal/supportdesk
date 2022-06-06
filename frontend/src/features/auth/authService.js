// authService.js - file to make request to API
import axios from "axios";

const API_URL = "/api/users";

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData); //making POST request to API_URL

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
};

export default authService;
