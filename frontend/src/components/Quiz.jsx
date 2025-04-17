import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  console.log("API_URL configurada:", API_URL);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Primeiro, buscar a configuração do número de perguntas
      const configResponse = await axios.get(`${API_URL}/config`);
      const questionCount = configResponse.data.questionCount;

      // Depois, buscar as perguntas
      const questionsResponse = await axios.get(`${API_URL}/questions`);

      if (questionsResponse.data && Array.isArray(questionsResponse.data)) {
        // Embaralhar as perguntas e pegar apenas o número configurado
        const shuffledQuestions = questionsResponse.data
          .sort(() => Math.random() - 0.5)
          .slice(0, questionCount);

        setQuestions(shuffledQuestions);
      } else {
        throw new Error(
          `Resposta inválida: ${JSON.stringify(questionsResponse.data)}`
        );
      }
    } catch (err) {
      console.error("Erro detalhado:", {
        message: err.message,
        response: err.response,
        request: err.request,
        config: err.config,
      });

      if (err.response) {
        setError(
          `Erro ${err.response.status}: ${
            err.response.data.message || "Erro ao carregar perguntas"
          }`
        );
      } else if (err.request) {
        setError(
          "Não foi possível conectar ao servidor. Verifique se o servidor está rodando."
        );
      } else {
        setError(`Erro: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Componente Quiz montado");
    fetchQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    if (!answered) {
      setSelectedOption(option);
      setAnswered(true);

      if (option === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      saveScore();
      setShowScore(true);
    }
  };

  const saveScore = async () => {
    try {
      await axios.post(`${API_URL}/scores`, { score });
    } catch (err) {
      console.error("Erro ao salvar pontuação:", err);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswered(false);
    fetchQuestions();
  };

  const handleViewRanking = () => {
    navigate("/ranking");
  };

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading">Carregando perguntas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="error">{error}</div>
        <button onClick={fetchQuestions} className="retry-button">
          Tentar Novamente
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="no-questions">Nenhuma pergunta disponível.</div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="quiz-container">
        <div className="score-section">
          <h2>Quiz Concluído!</h2>
          <p>
            Você acertou {score} de {questions.length} perguntas.
          </p>
          <div className="score-buttons">
            <button onClick={handleRestart} className="restart-button">
              Jogar Novamente
            </button>
            <button onClick={handleViewRanking} className="ranking-button">
              Ver Ranking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="question-section">
        <div className="question-count">
          <span>Pergunta {currentQuestion + 1}</span>/{questions.length}
        </div>
        <div className="question-text">
          {questions[currentQuestion].question}
        </div>
        <div className="options-section">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedOption === option
                  ? option === questions[currentQuestion].answer
                    ? "correct"
                    : "incorrect"
                  : ""
              }`}
              onClick={() => handleOptionSelect(option)}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="navigation-section">
          <button
            onClick={handleNextQuestion}
            className="next-button"
            disabled={!answered}
          >
            {currentQuestion + 1 === questions.length ? "Finalizar" : "Próxima"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
