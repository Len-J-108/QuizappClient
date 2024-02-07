import { useTimer } from 'react-timer-hook';
import API from '../axios.js';
import { useContext } from 'react';
import GameContext from '../context/GameContext.jsx';


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
      <>
        <p>...You will have to wait</p>
      <div style={{textAlign: 'center'}}>
        <div style={{fontSize: '50px', color: 'orange'}}>
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
      </>
    );
  }

export default LockTimer;