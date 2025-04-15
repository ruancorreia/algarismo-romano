import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestions, submitScore } from "../api";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getQuestions();
      setQuestions(res.data);
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelected(option);
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    }, 1000);
  };

  useEffect(() => {
    if (currentQuestion === questions.length && questions.length > 0) {
      submitScore({ name: location.state.name, score });
      navigate("/ranking");
    }
  }, [currentQuestion, questions]);

  if (!questions.length) return <div>Carregando...</div>;

  return (
    <div className="quiz-container">
      <h2>
        Questão {currentQuestion + 1}/{questions.length}
      </h2>
      <p>{questions[currentQuestion].question}</p>
      <div className="options">
        {questions[currentQuestion].options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            className={
              selected === option
                ? option === questions[currentQuestion].correctAnswer
                  ? "correct"
                  : "wrong"
                : ""
            }
            disabled={selected !== null}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
