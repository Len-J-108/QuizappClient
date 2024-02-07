import { useContext, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import GameContext from "../context/GameContext.jsx";
import toast from 'react-hot-toast';

const Logout = () => {
  let navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(GameContext);
    
    async function logoutUser() {
      try {
        const { data } = await axios.get("http://localhost:5000/users/logout");
        if (data.logout) {
          setIsLoggedIn(false);
          setUserData({}); 
          toast.success('Logout successfully')
          navigate("/")
        }
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
        if (isLoggedIn) {
            logoutUser();   
      }

  },[])

  return <div>Erfolgreich ausgeloggt</div>;
};

export default Logout;
