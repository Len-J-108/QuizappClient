import axios from "axios";
import {URL} from './utils/url.js';

export default axios.create({
  baseURL: URL,
  withCredentials: true,
  credentials: "include",
});
