import Typewriter from '../customHooks/useTypewriter'


const Question = ({txt}) => {
  return (
    <Typewriter text={txt} delay={50}/>
  )
}

export default Question