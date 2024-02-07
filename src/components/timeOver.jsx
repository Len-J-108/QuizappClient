import axios from "axios";

const timeOver = () => {
  axios.post(
    "http://localhost:5000/users/timeOver",
    { status: "Zeit abgelaufen" },
    { withCredentials: true }
  );
};

export default timeOver;
