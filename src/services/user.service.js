import axios from "axios";
import authHeader from "./auth-header";

const API_URL =  process.env.REACT_APP_URL + "/api";

const getPublicContent = async () => {
  const res= await axios.post(API_URL + "/welcome",{},{ headers: authHeader() });
  console.log("44444",res);
  return res
};
const submitDocument = async (doc) => {
  console.log("555555");
  const res= await axios.post(API_URL+"/documents/submit",{data:doc},{ headers: authHeader() });
  console.log("sssss",res);
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
  submitDocument
};

export default UserService;
