import axios from "axios";

const API_URL = "http://localhost:5000/";

const register = (data) => {
  return axios.post(API_URL + "users", data);
};

const login = async (data) => {
  const response = await axios.post(API_URL + "currentUser", data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const userProfile = () => {
  const token = localStorage.user;
  const response = axios.get(API_URL + "currentUser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
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
  userProfile,
};
