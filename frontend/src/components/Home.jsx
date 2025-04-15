import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const history = useHistory();

  const startQuiz = () => {
    if (name) {
      localStorage.setItem("userName", name);
      history.push("/quiz");
    }
  };

  return (
    <div>
      <h1>Quiz de Números Romanos</h1>
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
