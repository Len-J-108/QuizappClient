import { useEffect } from 'react';

const BlinkingQuestionMarks = () => {
  useEffect(() => {
    // Definieren Sie die Blink-Animation
    var style = document.createElement('style');
    style.innerHTML = `
      @keyframes blink {
        0% {opacity: 1;}
        50% {opacity: 0;}
        100% {opacity: 1;}
      }
    `;
    document.head.appendChild(style);

    // Definieren Sie die Anzahl der Fragezeichen, die Sie anzeigen möchten
    var numQuestionMarks = 10;

    // Erstellen Sie das Hintergrund-div und fügen Sie es dem body-Element hinzu
    var backgroundDiv = document.createElement("div");
    backgroundDiv.style.position = "fixed"; // Aktualisiert
    backgroundDiv.style.top = 0;
    backgroundDiv.style.left = 0;
    backgroundDiv.style.width = "100%";
    backgroundDiv.style.height = "100%";
    backgroundDiv.style.zIndex = "-1";
    backgroundDiv.style.background = "radial-gradient(circle, rgb(45, 94, 50) 0%, rgb(0, 0, 0) 100%)";
    backgroundDiv.style.animation = "gradient 3s ease infinite";
    document.body.appendChild(backgroundDiv);

    // Erstellen Sie das übergeordnete div-Element für den Inhalt
    var contentDiv = document.createElement("div");
    contentDiv.style.position = "relative"; // Aktualisiert
    contentDiv.style.overflow = "auto"; // Aktualisiert
    contentDiv.style.width = "100%";
    contentDiv.style.height = "100%";
    document.body.appendChild(contentDiv);

    // Erstellen Sie die Fragezeichen und fügen Sie sie dem Hintergrund-div hinzu
    var divs = [];
    for (var i = 0; i < numQuestionMarks; i++) {
      // Erstellen Sie ein neues div-Element für jedes Fragezeichen
      var div = document.createElement("div");

      // Fügen Sie das Fragezeichen als Inhalt hinzu
      div.textContent = "?";

      // Fügen Sie die notwendigen CSS-Stile hinzu
      div.style.position = "absolute";
      div.style.color= "lightgreen";
      div.style.left = Math.random() * (window.innerWidth - 50) + "px"; // Aktualisiert
      div.style.top = Math.random() * (window.innerHeight - 50) + "px"; // Aktualisiert
      div.style.fontSize = "50px";
      div.style.animation = "blink 5s linear infinite";

      // Fügen Sie das div-Element zum Hintergrund-div hinzu
      backgroundDiv.appendChild(div);
      divs.push(div);
    }

    // Ändern Sie die Position des Fragezeichens in regelmäßigen Abständen
    var intervalId = setInterval(function() {
      divs.forEach(function(div) {
        div.style.left = Math.random() * (window.innerWidth - 50) + "px"; // Aktualisiert
        div.style.top = Math.random() * (window.innerHeight - 50) + "px"; // Aktualisiert
      });
    }, 5000);

    // Löschen Sie den Timer, wenn die Komponente unmountet wird
    return function cleanup() {
      clearInterval(intervalId);
      divs.forEach(function(div) {
        backgroundDiv.removeChild(div);
      });
      document.body.removeChild(backgroundDiv);
    };
  }, []);

  return null;
};

export default BlinkingQuestionMarks;
