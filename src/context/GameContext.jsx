import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import API from "../axios.js";
import useSWR, { mutate } from "swr";
import { URL } from "../utils/url.js";

// UseSWR Hook fetcher
const fetcher = (url) =>
  API.get(url).then((res) => {
    return res.data;
  });

const GameContext = createContext({});

// socket variable outside function with backend url
const socket = io(URL);

export const GameContextProvider = ({ children }) => {
  // UseStates
  const [userData, setUserData] = useState({
    username: "",
    role: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [livepoints, setLivepoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState("current");
  const [eventStart, setEventStart] = useState(false);
  const [timer, setTimer] = useState(false);
  const [joker, setJoker] = useState(true);
  const [controls, setControls] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [allCorrect, setAllCorrect] = useState(false);
  const [pause, setPause] = useState(false);
  const [fetchURLS] = useState({
    question: `${URL}/questions/get-game-question`,
    answer: `${URL}/questions/check-answer`,
    isRight: `${URL}/questions/answer-right`,
    isWrong: `${URL}/questions/answer-wrong`,
    userData: `${URL}/users/get-user-data`,
    joker: `${URL}/questions/joker`,
  });

  // useSWR conditional on eventStart
  const fetchUserData = useSWR(fetchURLS.userData, fetcher, { suspense: true });

  useEffect(() => {
    mutate(fetchURLS.userData); // this triggers the socket in the backend for userData
  }, [isLoggedIn]);

  useEffect(() => {
    if (!joker) {
      API.get(`${fetchURLS.joker}/${questions.question_id}`)
        .then((res) => res.data)
        .then((data) => {
          setQuestions(data);
        });
    }
  }, [joker]);

  // triggered when socket in backend changes
  useEffect(() => {
    socket.on("points", (data) => {
      setLivepoints(data);
    });
    socket.on("userdata", (data) => {
      setIsLoggedIn(true);
      setUserData(data); // set userdata
    });
  }, [socket]);

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
    <GameContext.Provider
      value={{
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
