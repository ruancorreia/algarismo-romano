import React, { useState } from "react";

const Admin = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  const addQuestion = async () => {
    const newQuestion = { question, options, answer };
    await fetch("http://localhost:5000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    });
    // Limpar os campos após adicionar
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
  };

  return (
    <div>
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
    </div>
  );
};

export default Admin;
