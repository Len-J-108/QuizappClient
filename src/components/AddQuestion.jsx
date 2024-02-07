import { useState } from 'react'
import axios from 'axios';
import cl from '../styles/forms.module.scss';
import ButtonOne from '../elements/buttonOne';

const url = 'http://localhost:5000'

function AddQuestion() {
  const [quest, setQuest] = useState({
    quest: '',
    level: 0,
  })
  
  const [rightAnswer, setRightAnswer] = useState({answer: '', isTrue: true})
  const [firstFalseAnswer, setFirstFalseAnswer] = useState({answer: '', isTrue: false})
  const [secondFalseAnswer, setSecondFalseAnswer] = useState({answer: '', isTrue: false})
  const [thirdFalseAnswer, setThirdFalseAnswer] = useState({answer: '', isTrue: false})

  
  const changeQuest = (e) => {
    setQuest(vals => ({...vals, [e.target.name]: e.target.value}))
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      quest: quest.quest,
      level: quest.level,
      answers: [
        {answer: rightAnswer.answer, isTrue: rightAnswer.isTrue},
        {answer: firstFalseAnswer.answer, isTrue: firstFalseAnswer.isTrue},
        {answer: secondFalseAnswer.answer, isTrue: secondFalseAnswer.isTrue},
        {answer: thirdFalseAnswer.answer, isTrue: thirdFalseAnswer.isTrue},
      ]
    }
    console.log(data)

    //fetch
    axios.post(`${url}/questions/add-one`, data)
      .then(() => console.log('Question added'))
      .then(() => alert('Question added'))
      .then(()=> {
        //reset form
      })
      .catch((err) => console.log('ERROOORRR',err))


  }

  return (
    <div className={cl.formCard} id="frm">
      <h2 className={cl.formCardHeading}>Add Question</h2>
      <form className={cl.formCardForm} onSubmit={submitHandler}>
        <div>
          <h5>Level (0-9):</h5>
          <input 
            className={cl.addQuestionRider}
            type="range" 
            id="level" 
            name="level" 
            min="0" 
            max="9"
            onChange={changeQuest} />
          <p>{quest.level}</p>
        </div>
        <label className={cl.formCardLabel} htmlFor="question">Question</label>
        <input
          type="text" 
          name="quest" 
          id="quest" 
          className={cl.formCardInput}
          required
          onChange={changeQuest}>
        </input>
        <label className={cl.formCardLabel} htmlFor="antwort-richtig">True answer</label>
        <input 
          type="text"
          name="rightAnswer" 
          id="rightAnswer" 
          cols="30" 
          rows="10" 
          className={cl.formCardInput}
          required
          onChange={(e) => {
            setRightAnswer(vals => ({...vals, answer: e.target.value}))
          }}>
        </input>
        <label className={cl.formCardLabel} htmlFor="Antwort-zwei">False answer 1</label>
        <input 
          type="text"
          name="firstFalseAnswer" 
          id="firstFalseAnswer" 
          cols="30" 
          rows="10" 
          className={cl.formCardInput}
          required
          onChange={(e) => {
            setFirstFalseAnswer(vals => ({...vals, answer: e.target.value}))
          }}
          >
        </input> 
        <label className={cl.formCardLabel} htmlFor="Antwort-drei">False Answer 2</label>
        <input 
          type="text"
          name="secondFalseAnswer" 
          id="secondFalseAnswer" 
          cols="30" 
          rows="10" 
          className={cl.formCardInput}
          required
          onChange={(e) => {
            setSecondFalseAnswer(vals => ({...vals, answer: e.target.value}))
          }}
          >
        </input> 
        <label className={cl.formCardLabel} htmlFor="Antwort-vier">False answer 3</label>
        <input 
          type="text"
          name="thirdFalseAnswer" 
          id="thirdFalseAnswer" 
          cols="30" 
          rows="10" 
          className={cl.formCardInput}
          required
          onChange={(e) => {
            setThirdFalseAnswer(vals => ({...vals, answer: e.target.value}))
          }}
          >
        </input> 
        <ButtonOne name="add"/>
      </form>
    </div>
  )
}

export default AddQuestion
