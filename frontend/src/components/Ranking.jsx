import React from "react";

const Ranking = () => {
  const userName = localStorage.getItem("userName");
  const score = localStorage.getItem("userScore"); // Supondo que você armazene a pontuação

  return (
    <div>
      <h1>Ranking</h1>
      <p>Nome: {userName}</p>
      <p>Pontuação: {score}</p>
      <button onClick={() => window.location.reload()}>Repetir Quiz</button>
    </div>
  );
};

export default Ranking;
