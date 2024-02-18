import { useContext, Suspense } from "react";
import confetti from "canvas-confetti";
import "react-circular-progressbar/dist/styles.css";
import GameContext from "./context/GameContext.jsx";
import Pyramide from "./components/Pyramide.jsx";
import LockTimer from "./components/LockTimer.jsx";
import QuestionsMatrix from "./components/QuestionsMatrix.jsx";
import GameControls from "./components/GameControls.jsx";
import { motion } from "framer-motion"
import SpinnerOne from "./components/SpinnerOne.jsx";
import LetsGo from "./elements/LetsGo.jsx";
import utilities from './styles/utilities.module.scss';
import cl from './styles/gamePage.module.scss';

const GamePage = () => {
  const {
    userData,
    result, 
    correctCount, 
    allCorrect, 
    setAllCorrect,
    } = useContext(GameContext);

  if (result !== "current") {
    return (
      <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
        className="answer"><h2>{result}</h2></motion.div>
    )
  }

  // Play Confetti if all correct
  if (allCorrect) {
    confetti({
      particleCount: 100,
      spread: 190,
      origin: { y: 0 },
      gravity: 1.5,
      scalar: 1,
          });
    setTimeout(() => {
      confetti.reset();
      setAllCorrect(false);
    }, 5000);
  }
  
  // render Win Message when all correct
  if (allCorrect) {
    return (
      <div id="winText" className="winText pulse">
        Won
      </div>
    )
  }
  
  return ( 
    <Suspense fallback={<SpinnerOne />}>
      <div className={`${utilities["flex-col-evenly"]} ${utilities["height-100"]}`}>
        <LetsGo />
        <GameControls />
        <QuestionsMatrix />
        {userData.locked && <LockTimer expiryTimestamp={new Date(userData.lockExpires)}/>} 
        {/* <Pyramide correctCount={correctCount} incomingResult={result} /> */}
      </div> 
    </Suspense> 
  );
};

export default GamePage;
