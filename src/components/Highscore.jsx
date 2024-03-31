import { useEffect, useState, useContext } from "react";
import "../styles/Highscore.css";
import GameContext from "../context/GameContext";
import {URL} from '../utils/url.js';

function Highscore() {
  const [highscores, setHighscores] = useState([]);

  const {setAllCorrect, setResult} = useContext(GameContext);

  useEffect(() => {
    setAllCorrect(false); // resets Confetti & WinMessage in QuestionPage.jsx
    setResult("current");
    fetch(`${URL}/users/all-users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Netzwerkantwort war nicht ok");
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => b.record - a.record);
        setHighscores(sortedData);
      })
      .catch((error) => {
        console.error("Fehler:", error);
      });
  }, []);

  const getTitle = (index) => {
    switch (index) {
      case 0:
        return "Quiz-Meister";
      case 1:
        return "Wissens-Professor";
      case 2:
        return "Rätsel-Doktor";
      case 3:
        return "Räsel-Rakete";
      case 4:
        return "Rätsel-Rocker";
      case 5:
        return "Antwort-Akrobat";
      case 6:
        return "Rätsel-Rambo";
      case 7:
        return "Rätsel-Ritter";
      case 8:
        return "Rätsel-Radler";
      case 9:
        return "Wissens-Warrior";

      default:
        return "Punkte-Praktikant";
    }
  };

  return (
    <>
      <div className="score">
        <h1 className="glow">Highscores</h1>
        <table>
          <thead>
            <tr>
              <th>Rang</th>
              <th>Username</th>
              <th>Points</th>
              <th>Titel</th>
            </tr>
          </thead>
          <tbody>
            {highscores.map((record, index) => (
              <tr key={record.username} className={`rang-${index + 1}`}>
                <td
                  className={
                    index % 2 === 0 ? "einfliegenLinks" : "einfliegenRechts"
                  }
                >
                  {index + 1}
                </td>
                <td
                  className={
                    index % 2 === 0 ? "einfliegenLinks" : "einfliegenRechts"
                  }
                >
                  {record.username}
                </td>
                <td
                  className={
                    index % 2 === 0 ? "einfliegenLinks" : "einfliegenRechts"
                  }
                >
                  {record.record}
                </td>
                <td
                  className={
                    index % 2 === 0 ? "einfliegenLinks" : "einfliegenRechts"
                  }
                >
                  {getTitle(index)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Highscore;
