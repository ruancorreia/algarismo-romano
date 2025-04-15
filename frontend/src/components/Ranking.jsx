import React, { useEffect, useState } from "react";

const Ranking = () => {
  const [scores, setScores] = useState([]);

  const fetchScores = async () => {
    const response = await fetch("http://localhost:5000/api/scores");
    const data = await response.json();

    // Ordenar os scores em ordem decrescente
    const sortedScores = data.sort((a, b) => b.score - a.score);
    setScores(sortedScores);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div>
      <h1>Ranking</h1>
      <ul>
        {scores.map((score) => (
          <li key={score._id}>
            Nome: {score.userName} - Pontuação: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
