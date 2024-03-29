import {useEffect, useContext, useState} from 'react';
import { useTimer } from 'react-timer-hook';
import timeOver from "./timeOver.jsx";
import GameContext from '../context/GameContext.jsx';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import '../styles/timer.css';

function Timer({ expiryTimestamp }) {
// react-timer-hook
  const {
    // totalSeconds,
    seconds,
    // isRunning,
    // start,
    pause,
    restart,
  } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => timeIsUp() });

// Context
  const {setResult, stopRound, result, eventStart, allCorrect, timer, setTimer} = useContext(GameContext);

// States
  const [timerValue, setTimerValue] = useState(100);
  const [timerEnd, setTimerEnd] = useState(Date.now() + 45000) 

// Function when time is over
  const timeIsUp = () => {
        setResult("Leider ist deine Zeit abgelaufen");
        timeOver();
        stopRound();
        setTimeout(() => {
          setResult("current");
        }, 5000)    
  }

// Micro Interval for css animation
  const microTime  = () => {
    let timerId = setInterval(() => {
      setTimerValue(((timerEnd - Date.now()) / 1000 / 45) * 100);
    }, 100) 
    return () => clearInterval(timerId);
  }

// Start Timer on render
  useEffect(() => {
    const time = new Date();
    restart(time.setSeconds(time.getSeconds() + 45)); 
    microTime();
    return () => { //  Pause Timer on unmount (when timer state is false)
      pause();
    }
  }, [])

  return (
    <>
    {result === "current" && eventStart && !allCorrect && (
      <div style={{ width: 100, height: 100}}  >
        <CircularProgressbar 
          value={timerValue} 
          text={seconds} 
          counterClockwise="true" 
          styles={{path: {
            stroke: `${timerValue > 66 ? 'green' : timerValue > 33 ? 'orange' : 'red'}`,
          },
          text: {
            fill: 'white',
          }
        }}
        className={timerValue < 25 ? 'timer-position blink' : 'timer-position'}
          />
      </div>
    )}
  </>
  );
}
export default Timer;