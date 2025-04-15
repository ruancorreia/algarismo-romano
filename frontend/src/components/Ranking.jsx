import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Ranking = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

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
      <button onClick={() => navigate("/")}>Repetir Teste</button>
    </div>
  );
};

export default Ranking;
