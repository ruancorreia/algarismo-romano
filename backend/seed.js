require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("./models/Question"); // Certifique-se de que o caminho está correto

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao MongoDB");
    return Question.deleteMany({}); // Limpa a coleção antes de adicionar novas perguntas
  })
  .then(() => {
    // Perguntas a serem inseridas
    const questions = [
      {
        question: "Qual é o número romano para 1?",
        options: ["I", "II", "III", "IV"],
        answer: "I",
      },
      {
        question: "Qual é o número romano para 5?",
        options: ["V", "X", "L", "C"],
        answer: "V",
      },
      {
        question: "Qual é o número romano para 10?",
        options: ["X", "V", "I", "L"],
        answer: "X",
      },
      {
        question: "Qual é o número romano para 50?",
        options: ["L", "C", "D", "M"],
        answer: "L",
      },
      {
        question: "Qual é o número romano para 100?",
        options: ["C", "D", "M", "X"],
        answer: "C",
      },
      {
        question: "Qual é o número romano para 500?",
        options: ["D", "C", "M", "L"],
        answer: "D",
      },
      {
        question: "Qual é o número romano para 1000?",
        options: ["M", "D", "C", "L"],
        answer: "M",
      },
      {
        question: "Qual é o número romano para 4?",
        options: ["IV", "III", "II", "I"],
        answer: "IV",
      },
      {
        question: "Qual é o número romano para 9?",
        options: ["IX", "VIII", "VII", "X"],
        answer: "IX",
      },
      {
        question: "Qual é o número romano para 40?",
        options: ["XL", "L", "XXX", "X"],
        answer: "XL",
      },
    ];

    // Inserir as perguntas no banco de dados
    return Question.insertMany(questions);
  })
  .then(() => {
    console.log("Perguntas inseridas com sucesso!");
    mongoose.connection.close(); // Fecha a conexão com o banco de dados
  })
  .catch((err) => {
    console.error("Erro ao inserir perguntas:", err);
    mongoose.connection.close(); // Fecha a conexão em caso de erro
  });
