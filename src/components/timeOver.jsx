import axios from "axios";
import {URL} from '../utils/url.js';

const timeOver = () => {
  axios.post(
    `${URL}/users/timeOver`,
    { status: "Zeit abgelaufen" },
    { withCredentials: true }
  );
};

export default timeOver;
