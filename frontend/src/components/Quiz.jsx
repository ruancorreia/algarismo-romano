import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:5000/api/questions");
      const data = await response.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleEndQuiz = () => {
    const saveScore = async () => {
      const existingScoresResponse = await fetch(
        "http://localhost:5000/api/scores"
      );
      const existingScores = await existingScoresResponse.json();
      const existingUserScore = existingScores.find(
        (score) => score.userName === userName
      );

      if (existingUserScore) {
        await fetch(
          `http://localhost:5000/api/scores/${existingUserScore._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ score }),
          }
        );
      } else {
        await fetch("http://localhost:5000/api/scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, score }),
        });
      }
    };

    saveScore().then(() => {
      navigate("/ranking");
    });
  };

  if (currentQuestion >= questions.length) {
    return (
      <div>
        <h2>Parabéns, {userName}!</h2>
        <p>
          Você acertou {score} de {questions.length} perguntas!
        </p>
        <button onClick={handleEndQuiz}>Encerrar Quiz</button>
      </div>
    );
  }

  const shuffledOptions = [...questions[currentQuestion].options].sort(
    () => Math.random() - 0.5
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{questions[currentQuestion].question}</h2>
      {shuffledOptions.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleEndQuiz}>Encerrar Quiz</button>
      </div>
    </div>
  );
};

export default Quiz;
