import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const startQuiz = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
      navigate("/quiz");
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Quiz de Números Romanos</h1>
      <span className="home-subtitle">
        Quiz criado para Lara estudar sobre números romanos
      </span>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="home-input"
      />
      <button
        onClick={startQuiz}
        className="home-button"
        disabled={!name.trim()}
      >
        Iniciar Quiz
      </button>
    </div>
  );
};

export default Home;
