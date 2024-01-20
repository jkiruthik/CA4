import React, { useState } from "react";
import "./App.css";
import questions from './Data';

function App() {
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [highlited, setHighlited] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const divStyle = {
    backgroundColor: isDark ? "black" : "white"
  };

  const themeChange = () => {
    setIsDark(!isDark);
  };

  const optionClicked = (option) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[currentQuestion] = option;
      return updatedOptions;
    });

    if (option.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setFinalResults(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
    setSelectedOptions([]);
  };
  
  return (
    <div className="App" style={divStyle}>
      <img src="https://e7.pngegg.com/pngimages/4/396/png-clipart-question-mark-faq-information-others-miscellaneous-text.png" width="80px" height="80px" alt="img3" />
      <h2 className="header" style={{ color: isDark ? 'white' : 'darkblue' }}> Attempt Question Here </h2>
      {showFinalResults ? (
        <div className="final-results">
          <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" width="80px" height="80px" alt="img2" />
          <h2> You have successfully submitted the assignment </h2>
          <p> <b>Questions asked :</b> {questions.length}</p>
          <p> <b>Questions correct :</b> {score}</p>
          <p> <b>Your Score : </b>{(score / questions.length).toFixed(2) * 100} %</p>
          <button onClick={restartGame}> Restart Quiz </button>
        </div>
      ) : (
        <div className="row">
          <div className=" question-card">
            <h3> Question :  {currentQuestion + 1} out of {questions.length} </h3>
            <h4 style={highlited?{color:"red"}:{color:"black"}}>
              Q. {currentQuestion + 1}. {questions[currentQuestion].text}
            </h4>
            <ul>
              {questions[currentQuestion].options.map((option) => (
                <li onClick={() => optionClicked(option)} key={option.id}>
                  {option.text}
                </li>
              ))}
              <button onClick={() => setHighlited(true)}>Highlight</button>
              <button onClick={() => setHighlited(false)}>De-Highlight</button>
            </ul>
          </div>
        </div>
      )}
      <button onClick={themeChange}>{isDark ? "Light" : "Dark"}</button>
    </div>
  );
}

export default App;
