import { useContext, useEffect } from "react";
import GameContext from "../context/GameContext";
import { axiosGet } from "../fetcher.js";
import useSWR from 'swr'
import API from '../axios.js';
import Timer from "./Timer.jsx";
import AnswerBtn from "../elements/AnswerBtn.jsx";
import { motion } from "framer-motion"
import utilities from '../styles/utilities.module.scss';
import cl from '../styles/questionsMatrix.module.scss';
import Question from "../elements/Question.jsx";
import Typewriter from "../customHooks/useTypewriter.jsx";

const QuestionsMatrix = () => {

  const exitAnimation = {
    opacity: 0,
    transition: { duration: 3.5 }, // Adjust the duration as needed
  };

  const {
    setResult,
    correctCount, 
    eventStart,
    setTimer,      
    stopRound, // function,
    questTimer, // function
    setJoker,
    controls,
    setControls,
    questions,
    setQuestions,
    setAllCorrect,
    livepoints,
    pause, 
    setPause,
    fetchURLS, 
    timerDuration,
  } = useContext(GameContext);
  
  // useSWR conditional on eventStart
  const fetchQuestion = useSWR(eventStart? (fetchURLS.question + `/${correctCount}`) : null, axiosGet, {suspense: true});
  const fetchCheckAnswer = useSWR(pause ? (fetchURLS.answer + `/${questions.question_id}`) : null, axiosGet, {suspense: true} );

  useEffect(() => {
    if (pause) {
      setControls(false);
      setTimer(false);
      if (fetchCheckAnswer.data === pause) {
        API.get(`http://localhost:5000/questions/answer-right/${questions.question_id}`)
          .then(() => {
            if (correctCount + 1 === 10 ) {
              setAllCorrect(true);
              stopRound();
              return 
            } else {
            setResult("True");
            questTimer(400); // ! watiTime between questions
              }

          })
      } else {
        // case answer is wrong
        console.log('answer is wrong');
        API.get(`http://localhost:5000/questions/answer-wrong/${questions.question_id}`)
          .then(() => {
            setResult("False");
            setJoker(false);
            setTimeout(() => {
              setResult("current");
              stopRound();
            }, 3000);
          })
        }
    }
    setPause(false);
  }, [pause])
  
// On EventStart => set new fetched Question & start Timer
  useEffect(() => {
    if (eventStart && livepoints) {
      setQuestions(fetchQuestion.data);
      // setTimer(true) // ! here
      setResult("current");
  }
  }, [correctCount, eventStart]);

  if (questions && eventStart && livepoints && controls) {
    return (
      <motion.div
        className={`${utilities["flex-col"]} ${utilities["height-100"]} ${cl.questionsMatrix}`}
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
        exit={exitAnimation}
        >
          <Question txt={questions?.question}/>
          <div className={cl.answersWapper}>
            {questions.answers.map((option, index) => (
              <AnswerBtn option={option} key={index} />
            ))}
          </div>
            {/* <Timer expiryTimestamp={timerDuration} />  // todo return it!! */}
        </motion.div>
   )
  }

  return null;
}

export default QuestionsMatrix