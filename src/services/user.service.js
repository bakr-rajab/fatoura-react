import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const getPublicContent = async () => {
  const res= await axios.get(API_URL + "/1");
  console.log(res);
  return res
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
