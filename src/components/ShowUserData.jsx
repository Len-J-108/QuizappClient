import { useContext } from "react";
import GameContext from "../context/GameContext.jsx";
import cl from "../styles/header.module.scss";


const ShowUserData = () => {
  const { userData, isLoggedIn, livepoints } = useContext(GameContext);

  if (!isLoggedIn) {
    return null;
  }
  const hearts = [];
  for (let i = 0; i < 3; i++) {
    if (i < livepoints) {
      hearts.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="red"
          className="bi bi-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 14.697l-.696-.617C3.697 10.697 1 8.303 1 5.5 1 3.43 2.43 2 4.5 2c1.148 0 2.19.547 2.5 1.333A2.49 2.49 0 0 1 9.5 2c2.07 0 3.5 1.43 3.5 3.5 0 2.803-2.697 5.197-7.304 8.58L8 14.697z"
          />
        </svg>
      );
    } else {
      hearts.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-heart"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 14.697l-.696-.617C3.697 10.697 1 8.303 1 5.5 1 3.43 2.43 2 4.5 2c1.148 0 2.19.547 2.5 1.333A2.49 2.49 0 0 1 9.5 2c2.07 0 3.5 1.43 3.5 3.5 0 2.803-2.697 5.197-7.304 8.58L8 14.697z"
          />
        </svg>
      );
    }
  }
  return (
    <div>
      welcome, {userData.role === 'admin' && userData.role} {userData.username}
      <br /> 
      Livepoints: {hearts}
      </div>
  );
};

export default ShowUserData;
