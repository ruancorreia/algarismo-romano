import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const startQuiz = () => {
    if (name) {
      localStorage.setItem("userName", name);
      navigate("/quiz");
    }
  };

  return (
    <div>
      <h1>Quiz de Números Romanos</h1>
      <t>Quiz criado para Lara estudar sobre números romanos</t>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={startQuiz}>Iniciar Quiz</button>
    </div>
  );
};

export default Home;
