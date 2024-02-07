import cl from '../styles/buttonOne.module.css';

const ButtonOne = ({name}) => {
  return (
    <button type="submit" className={cl.button}>{name}
    </button>
  )
}

export default ButtonOne