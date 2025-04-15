import React, { useState, useEffect } from "react";

const Admin = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState([]);

  // Função para buscar perguntas existentes
  const fetchQuestions = async () => {
    const response = await fetch("http://localhost:5000/api/questions");
    const data = await response.json();
    setQuestions(data);
  };

  // Função para buscar scores
  const fetchScores = async () => {
    const response = await fetch("http://localhost:5000/api/scores");
    const data = await response.json();
    setScores(data);
  };

  useEffect(() => {
    fetchQuestions();
    fetchScores();
  }, []);

  const addQuestion = async () => {
    const newQuestion = { question, options, answer };
    await fetch("http://localhost:5000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    fetchQuestions(); // Atualiza a lista de perguntas
  };

  const removeQuestion = async (id) => {
    await fetch(`http://localhost:5000/api/questions/${id}`, {
      method: "DELETE",
    });
    fetchQuestions(); // Atualiza a lista de perguntas
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div
        style={{
          flex: 1,
          marginRight: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        <h2>Perguntas Existentes</h2>
        <ul>
          {questions.map((q) => (
            <li key={q._id}>
              {q.question} - Resposta: {q.answer}
              <button onClick={() => removeQuestion(q._id)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          flex: 1,
          marginLeft: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        <h2>Adicionar Pergunta</h2>
        <input
          type="text"
          placeholder="Pergunta"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Opção ${index + 1}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
        ))}
        <input
          type="text"
          placeholder="Resposta Correta"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={addQuestion}>Adicionar Pergunta</button>

        <h2>Ranking</h2>
        <ul>
          {scores.map((score) => (
            <li key={score._id}>
              Nome: {score.userName} - Pontuação: {score.score}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
