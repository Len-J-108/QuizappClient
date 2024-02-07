import { useContext } from "react"
import GameContext from "../context/GameContext"
import cl from '../styles/letsGo.module.scss';

const LetsGo = () => {
  const {
    eventStart, 
    livepoints,
    setResult,
    setControls,
    setJoker,
    setCorrectCount,
    setAllCorrect,
    setEventStart,
  } = useContext(GameContext);

  // HandleBTnCLICK function
  const handleButtonClick = () => {
      setResult("current");
      setControls(true);
      setJoker(true);
      setCorrectCount(0);
      setAllCorrect(false);
      setEventStart(true);
  };

  if (!eventStart && (livepoints != 0)){
    return (
      <div className={cl.btnWrapper}>
      <button className={cl.btn} onClick={handleButtonClick} id="startButton">
            Let's Go
        </button>
      </div>
    )
    }

  return null;
}

export default LetsGo;