import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5173/",
  withCredentials: true,
  credentials: "include",
});
