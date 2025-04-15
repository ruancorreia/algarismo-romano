import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz", { state: { name } });
  };

  return (
    <div className="home-container">
      <h1>Quiz de Algarismos Romanos</h1>
      <input
        type="text"
        placeholder="Seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleStart}>Iniciar Quiz</button>
    </div>
  );
}
