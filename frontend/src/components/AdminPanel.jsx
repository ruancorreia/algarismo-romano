import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState({ questionCount: 10 });
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/questions`);
      setQuestions(response.data);
    } catch (err) {
      setError("Erro ao carregar perguntas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchScores = async () => {
    try {
      const response = await axios.get(`${API_URL}/scores`);
      setScores(response.data.sort((a, b) => b.score - a.score));
    } catch (err) {
      console.error("Erro ao carregar pontuações:", err);
    }
  };

  const fetchConfig = async () => {
    try {
      const response = await axios.get(`${API_URL}/config`);
      setConfig(response.data);
    } catch (err) {
      console.error("Erro ao carregar configurações:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchScores();
    fetchConfig();
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "options") {
      const newOptions = [...newQuestion.options];
      newOptions[index] = value;
      setNewQuestion({ ...newQuestion, options: newOptions });
    } else {
      setNewQuestion({ ...newQuestion, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/questions`, newQuestion);
      setNewQuestion({
        question: "",
        options: ["", "", "", ""],
        answer: "",
      });
      fetchQuestions();
    } catch (err) {
      setError("Erro ao adicionar pergunta");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/questions/${id}`);
      fetchQuestions();
    } catch (err) {
      setError("Erro ao remover pergunta");
      console.error(err);
    }
  };

  const handleDeleteScore = async (id) => {
    try {
      await axios.delete(`${API_URL}/scores/${id}`);
      fetchScores();
    } catch (err) {
      console.error("Erro ao remover pontuação:", err);
    }
  };

  const handleConfigChange = async (e) => {
    const value = parseInt(e.target.value) || 1;
    try {
      await axios.put(`${API_URL}/config`, { questionCount: value });
      setConfig({ ...config, questionCount: value });
    } catch (err) {
      console.error("Erro ao atualizar configurações:", err);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Painel Administrativo</h2>

      <div className="add-question-section">
        <h3>Adicionar Nova Pergunta</h3>
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-group">
            <label htmlFor="question">Pergunta:</label>
            <input
              type="text"
              id="question"
              name="question"
              value={newQuestion.question}
              onChange={(e) => handleInputChange(e)}
              required
              placeholder="Digite a pergunta"
            />
          </div>

          <div className="options-group">
            <label>Opções:</label>
            <div className="options-container">
              {newQuestion.options.map((option, index) => (
                <div key={index} className="option-input">
                  <input
                    type="text"
                    name="options"
                    value={option}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                    placeholder={`Opção ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="answer">Resposta Correta:</label>
            <input
              type="text"
              id="answer"
              name="answer"
              value={newQuestion.answer}
              onChange={(e) => handleInputChange(e)}
              required
              placeholder="Digite a resposta correta"
            />
          </div>

          <button type="submit" className="submit-button">
            Adicionar Pergunta
          </button>
        </form>
      </div>

      <div className="right-column">
        <div className="questions-list">
          <h3>Perguntas Existentes</h3>

          <div className="config-section">
            <div className="form-group">
              <label htmlFor="questionCount">
                Número de Perguntas no Quiz:
              </label>
              <input
                type="number"
                id="questionCount"
                name="questionCount"
                value={config.questionCount}
                onChange={handleConfigChange}
                min="1"
                max={questions.length || 1}
                className="question-count-input"
              />
              <small>Máximo disponível: {questions.length} perguntas</small>
            </div>
          </div>

          {loading ? (
            <p className="no-items">Carregando...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : questions.length === 0 ? (
            <p className="no-items">Nenhuma pergunta cadastrada</p>
          ) : (
            <ul>
              {questions.map((q) => (
                <li key={q._id} className="question-item">
                  <div className="question-content">
                    <p className="question-text">{q.question}</p>
                    <ul className="options-list">
                      {q.options.map((option, index) => (
                        <li
                          key={index}
                          className={`option ${
                            option === q.answer ? "correct" : ""
                          }`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="delete-button"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="ranking-section">
          <h3>Ranking de Pontuações</h3>
          {scores.length === 0 ? (
            <p className="no-items">Nenhuma pontuação registrada</p>
          ) : (
            <ul className="ranking-list">
              {scores.map((score, index) => (
                <li key={score._id} className="ranking-item">
                  <span className="ranking-position">{index + 1}º</span>
                  <span className="ranking-score">{score.score} pontos</span>
                  <button
                    onClick={() => handleDeleteScore(score._id)}
                    className="delete-button"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
