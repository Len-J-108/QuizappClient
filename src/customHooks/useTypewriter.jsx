import { useState, useEffect } from 'react';
import cl from '../styles/questionsMatrix.module.scss'
import ut from '../styles/utilities.module.scss';

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  // Typing logic goes here

  return <section className={cl.question}>{currentText}</section>;
};

export default Typewriter;