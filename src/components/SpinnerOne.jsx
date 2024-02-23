import ClipLoader from "react-spinners/ClipLoader";
import cl from '../styles/layout.module.scss';

const SpinnerOne = () => {
  return (
    <div className={cl["spinner-wrapper"]}>
      <ClipLoader color="#fcd34d" speedMultiplier={.5}/>
    </div>
  )
}

export default SpinnerOne