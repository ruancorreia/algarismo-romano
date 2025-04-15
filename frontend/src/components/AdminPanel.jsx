import { useEffect, useState } from "react";
import { getQuestions, addQuestion, deleteQuestion } from "../api";

export default function AdminPanel() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getQuestions();
      setQuestions(res.data);
    };
    fetchQuestions();
  }, []);

  const handleAddQuestion = async () => {
    if (newQuestion.options.length < 2) return;
    await addQuestion(newQuestion);
    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  return (
    <div className="admin-container">
      <h1>Painel Admin</h1>
      <div className="add-question">
        <input
          type="text"
          placeholder="Pergunta"
          value={newQuestion.question}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question: e.target.value })
          }
        />
        {newQuestion.options.map((option, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Opção ${i + 1}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...newQuestion.options];
              newOptions[i] = e.target.value;
              setNewQuestion({ ...newQuestion, options: newOptions });
            }}
          />
        ))}
        <select
          value={newQuestion.correctAnswer}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
          }
        >
          <option value="">Selecione a resposta correta</option>
          {newQuestion.options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={handleAddQuestion}>Adicionar Pergunta</button>
      </div>

      <div className="question-list">
        {questions.map((q, i) => (
          <div key={i} className="question-item">
            <p>{q.question}</p>
            <button
              onClick={async () => {
                await deleteQuestion(q._id);
                setQuestions(
                  questions.filter((question) => question._id !== q._id)
                );
              }}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
