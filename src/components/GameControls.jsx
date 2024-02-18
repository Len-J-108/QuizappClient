import { useContext } from "react"
import GameContext from "../context/GameContext"
import API from '../axios.js';
import { motion } from "framer-motion"
import cl from '../styles/GameControls.module.scss';
import { IconContext } from "react-icons";
import { IoHeartSharp } from "react-icons/io5";
import '../styles/hearts.css';

const GameControls = () => {


  const exitAnimation = {
    opacity: 0,
    transition: { duration: 3.5 }, // Adjust the duration as needed
  };

  const {
    controls, 
    setJoker, 
    setResult, 
    stopRound,
    questions,
    eventStart,
    livepoints
  } = useContext(GameContext);


  const userStoppedRound = () => {
    API    
      .post(
        "http://localhost:5000/users/user-stopped",
        {
          question_id: questions.question_id,
        },
        { withCredentials: true }
      )
      .then((response) => {
        const answer = response.data;
        if (answer.setPoints === true) {
          setResult(
            `${answer.points} point were added to your score`
          );
          setTimeout(() => {setResult("current")}, 5000)
        }
      });
  };


  if (eventStart && controls){
    return (
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
        exit={exitAnimation}    
        className={cl["game-controls-wrapper"]}
        >
            <button
            onClick={() => setJoker(false)}
            className={cl["game-btn"]}>
            50/50 Joker
            </button>
          <IconContext.Provider value={{  className:"heart" }}>
            <div >
              < IoHeartSharp className={livepoints>=1 ? 'red' : 'gray'} />
              < IoHeartSharp className={livepoints>=2 ? 'red' : 'gray'} />
              < IoHeartSharp className={livepoints>=3 ? 'red' : 'gray'} />
            </div> 
          </IconContext.Provider>
              <button
              className={cl["game-btn"]}
              type="button"
              onClick={() => {
                setResult("Runde beendet!"), stopRound(), userStoppedRound();
              }}
              >
              End Game
              </button>
      </motion.div>
      )
    }
  return null;
}

export default GameControls