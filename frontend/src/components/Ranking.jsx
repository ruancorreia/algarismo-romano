import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRanking } from "../api";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRanking = async () => {
      const res = await getRanking();
      setRanking(res.data);
    };
    fetchRanking();
  }, []);

  return (
    <div className="ranking-container">
      <h1>Top 10 Jogadores</h1>
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((player, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/")}>Voltar ao Início</button>
    </div>
  );
}
