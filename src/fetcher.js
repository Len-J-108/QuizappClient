import axios from "./axios";
import {URL} from './utils/url.js';

const ee = axios.create({
  baseURL: URL,
  withCredentials: true,
  credentials: "include",
});

export const axiosGet = (url) => {
  return ee.get(url).then((r) => r.data);
  }



