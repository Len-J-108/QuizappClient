import { useContext } from "react"
import GameContext from "../context/GameContext"
import cl from '../styles/questionsMatrix.module.scss';


  const AnswerBtn = ({option}) => {

    const {setPause} = useContext(GameContext);

    return (
        <button
          className={cl.answerBtn}
          onClick={() => 
            setPause(option.answer_id)
          }
          id={option.answer_id}
          >
            {option.answer}
        </button>
    )
  }
  
  export default AnswerBtn