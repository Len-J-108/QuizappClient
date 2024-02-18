import { useContext } from "react";
import GameContext from "../context/GameContext.jsx";
import cl from "../styles/header.module.scss";


const ShowUserData = () => {
  const { userData, isLoggedIn, livepoints } = useContext(GameContext);

  if (!isLoggedIn) {
    return null;
  }
    return (
    <div className={cl["userdata"]}>
      Welcome, {userData.role === 'admin' && userData.role} {userData.username}
      </div>
  );
};

export default ShowUserData;
