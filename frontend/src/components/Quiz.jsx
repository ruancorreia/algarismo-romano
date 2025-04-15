import React, { useEffect, useState } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:5000/api/questions");
      const data = await response.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion >= questions.length) {
    localStorage.setItem("userScore", score);
    return (
      <div>
        Você acertou {score} de {questions.length} perguntas!
        <button onClick={() => window.location.reload()}>Repetir Quiz</button>
      </div>
    );
  }

  // Embaralhar as opções
  const shuffledOptions = [...questions[currentQuestion].options].sort(
    () => Math.random() - 0.5
  );

  return (
    <div>
      <h2>{questions[currentQuestion].question}</h2>
      {shuffledOptions.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
