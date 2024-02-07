import { createContext, useState, useEffect} from "react"
import { io } from "socket.io-client";
import API from '../axios.js';
import useSWR, {mutate} from 'swr'


// UseSWR Hook fetcher
const fetcher = url => API.get(url).then(res => {
  return res.data
})

const GameContext = createContext({})

// socket variable outside function with backend url
const socket = io("http://localhost:5000");

export const GameContextProvider = ({children}) => {
  
  // UseStates
  const [userData, setUserData]  = useState({
    username: '',
    role: '',
    });
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [livepoints, setLivepoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState("current"); 
  const [eventStart, setEventStart] = useState(false); 
  const [timer, setTimer] = useState(false); 
  const [timerDuration, setTimerDuration] = useState(Date.now() + 45000); // ! here 
  const [joker, setJoker] = useState(true); 
  const [controls, setControls] = useState(false); 
  const [questions, setQuestions] = useState(null); 
  const [allCorrect, setAllCorrect] = useState(false);
  const [pause, setPause] = useState(false) 
  const [fetchURLS] = useState({
    question: 'http://localhost:5000/questions/get-game-question',
    answer: "http://localhost:5000/questions/check-answer",
    isRight: "http://localhost:5000/questions/answer-right",
    isWrong: "http://localhost:5000/questions/answer-wrong",
    userData: "http://localhost:5000/users/get-user-data",
    joker: "http://localhost:5000/questions/joker",
  })
  


  // useSWR conditional on eventStart
  const fetchUserData = useSWR(fetchURLS.userData, fetcher, {suspense: true});
  const fetchJoker = useSWR(joker ? null : (fetchURLS.joker + `/${questions.question_id}`), fetcher, {suspense: true});
  
  useEffect(() => {
    mutate(fetchURLS.userData); // this triggers the socket in the backend for userData
  }, [isLoggedIn])

  useEffect(() => {
    if (fetchJoker.data) {
      setQuestions(fetchJoker.data);
    }
  }, [joker])

  // triggered when socket in backend changes
  useEffect(() => {
        socket.on("points", (data) => { 
          setLivepoints(data);
        });
        socket.on("userdata", (data) => { 
          setIsLoggedIn(true);
          setUserData(data); // set userdata
        });
      }, [socket])

  // Stop Round Function
  const stopRound = () => {
    setTimer(false); 
    setEventStart(false);
  };

  // questTimer function
  const questTimer = (time) => {
    setTimeout(() => {
      setCorrectCount(correctCount + 1);
      // setPause(false); // todo needed?
      setResult("current");
      setTimer(true);
    setControls(true);
  }, time);
};
  
  return (
    <GameContext.Provider value={{
      userData, 
      setUserData,
      isLoggedIn, 
      setIsLoggedIn,
      correctCount, 
      setCorrectCount,
      result, 
      setResult,
      eventStart,
      setEventStart,
      timer, 
      setTimer,
      timerDuration, 
      setTimerDuration,
      stopRound, // function
      questTimer, // function
      joker,
      setJoker,
      controls,
      setControls,
      questions,
      setQuestions,
      allCorrect, 
      setAllCorrect,
      livepoints, 
      setLivepoints,
      pause, 
      setPause,
      fetchURLS,
      }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContext;