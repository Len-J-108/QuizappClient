import { useContext } from "react";
import "../styles/Pyramide.css"
import GameContext from "../context/GameContext";

const Pyramide = ({ correctCount, incomingResult }) => {
  const stufen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse();
  const selectedStufe = 11 - stufen[correctCount];

  const {eventStart, controls} = useContext(GameContext);

  if (eventStart && controls) {

    return (
      <div className="stufen">
      <div className="win">Gewinnstufen</div>
      {stufen.map((stufe) => {
        let classNameChoice = "";
        if (incomingResult === "current" && stufe === selectedStufe) {
          classNameChoice = "current";
        } else if (incomingResult === "Richtig!" && stufe === selectedStufe) {
          classNameChoice = "correct";
        } else if (incomingResult === "Falsch!" && stufe === selectedStufe) {
          classNameChoice = "wrong";
        }

        if (stufe < selectedStufe) {
          classNameChoice += "answered";
        }

        // Check if the device is a mobile device
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        // If it is a mobile device and the current step is not the selected step, hide the step
        if (isMobile && stufe !== selectedStufe) {
          return null;
        }

        return (
          <div key={stufe} className={`stufe${stufe} ${classNameChoice} pyramide`}>
            <span className="text">{stufe}</span>
          </div>
        );
      })}
    </div>
  );
}
return null;
};

export default Pyramide;
