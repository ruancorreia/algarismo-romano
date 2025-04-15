import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const history = useHistory();

  const handleStart = () => {
    // Salvar o nome do participante em algum lugar (contexto ou localStorage)
    history.push("/quiz");
  };

  return (
    <div>
      <h1>Bem-vindo ao Quiz de Algarismos Romanos!</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome"
      />
      <button onClick={handleStart}>Iniciar Quiz</button>
    </div>
  );
};

export default Home;
