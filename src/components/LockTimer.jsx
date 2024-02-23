import { useTimer } from 'react-timer-hook';
import API from '../axios.js';
import { useContext } from 'react';
import GameContext from '../context/GameContext.jsx';
import cl from '../styles/lockTimer.module.scss';


function LockTimer({ expiryTimestamp }) {

  const {setResult} = useContext(GameContext);

  const {
    seconds,
    minutes,
    hours,
    // isRunning,
  } = useTimer({ expiryTimestamp, onExpire: () => {  
    API.get("http://localhost:5000/users/get-user-data");
    setResult("current");
    }
  })

    return (
      <div className={cl.wrapper}>
        <p className={cl.txt}>...You will have to wait</p>
      <div style={{textAlign: 'center'}}>
        <div style={{fontSize: '50px', color: 'orange'}}>
          {hours ? <span>{hours}:</span> : null}
          {minutes ? <span>{minutes}:</span> : null}
          <span>{seconds}</span>
        </div>
      </div>
      </div>
    );
  }

export default LockTimer;