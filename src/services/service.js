import axios from "axios";

const API_URL = "http://localhost:5000/users";

const getAllUsers = () => {
  return axios.get(API_URL);
};

export default {
  getAllUsers,
};
