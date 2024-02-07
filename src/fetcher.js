import axios from "./axios";

const ee = axios.create({
  baseURL: "http://localhost:5173/",
  withCredentials: true,
  credentials: "include",
});

export const axiosGet = (url) => {
  return ee.get(url).then((r) => r.data);
  }



