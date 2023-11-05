import React, { useState } from 'react';
import { problems } from './questions';
import './App.css';
function Quizscreen() {
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (currentQuestion !== problems.length - 1) {
      setcurrentQuestion((prev) => prev + 1);
    } else {
      setcurrentQuestion(0);
      setShowResult(true);
    }
  }

  const SelectedAnswer = (answer, index) => {
    
      setSelectedAnswerIndex(index);
 
      if (answer === problems[currentQuestion].answer) {
        setSelectedAnswer(true);
      } else {
        setSelectedAnswer(false);
      }
    
  }

  const question = problems[currentQuestion] ? problems[currentQuestion].question : '';
  const options = problems[currentQuestion] ? problems[currentQuestion].options : [];

  return (
    <div className="container">
      {!showResult ? (
        <div>
          <h2>{question}</h2>
          <ul>
            {options.map((answer, index) => (
              <li
                onClick={() => SelectedAnswer(answer, index)}
                key={answer}
                className={selectedAnswerIndex === index ? 'selected-answer' : null}
              >
                {answer}
              </li>
            ))}
          </ul>
          <button onClick={nextQuestion} disabled={selectedAnswerIndex === null}>
            {currentQuestion === problems.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{problems.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Quizscreen;
