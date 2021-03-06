import axios from "axios";

const API_URL = "http://localhost:5000/";

const register = (data) => {
  return axios.post(API_URL + "users", data);
};

const login = async (data) => {
  const response = await axios.post(API_URL + "login", data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.clear();
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  register,
  login,
  logout,
};
