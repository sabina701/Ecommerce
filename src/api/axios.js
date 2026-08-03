import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://ecommerce-backend-pdih.onrender.com",
  withCredentials: true,
});

export default API;
