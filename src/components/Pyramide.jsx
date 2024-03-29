import { useContext } from "react";
import cl from '../styles/pyramide.module.scss';
import GameContext from "../context/GameContext";

const Pyramide = ({ correctCount, incomingResult }) => {
  const stufen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse();
  const selectedStufe = 11 - stufen[correctCount];

  const {eventStart, controls} = useContext(GameContext);

  if (eventStart && controls) {

    return (
      <div className={cl.stufen}>
      <div className={cl.heading}>Level</div>
      {stufen.map((stufe) => {
        // Current Level
        if (stufe === selectedStufe) {
          return (
            <div key={stufe} className={`${cl.pyramide} ${cl[`stufe${stufe}`]} ${cl["level-single"]} ${cl.current}`}>
              {stufe}
            </div>
          );
        }
        // Answered levels
        if (selectedStufe > stufe){
          return (
            <div key={stufe} className={`${cl.pyramide} ${cl[`stufe${stufe}`]} ${cl["level-single"]} ${cl.answered}`}>
              {stufe}
            </div>
          );
        }


        // Other rest levels
        return (
          <div key={stufe} className={`${cl.pyramide} ${cl[`stufe${stufe}`]} ${cl["level-single"]} ${cl.notAnswered}`}>
            {stufe}
          </div>
        );
      })}
    </div>
  );
}
return null;
};

export default Pyramide;
