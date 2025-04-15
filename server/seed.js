const mongoose = require("mongoose");
const Question = require("./models/Question");

mongoose
  .connect("mongodb://localhost:27017/romanQuiz", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const questions = [
      { question: "Qual é o algarismo romano para 1?", answer: "I" },
      { question: "Qual é o algarismo romano para 5?", answer: "V" },
      { question: "Qual é o algarismo romano para 10?", answer: "X" },
      { question: "Qual é o algarismo romano para 50?", answer: "L" },
      { question: "Qual é o algarismo romano para 100?", answer: "C" },
      { question: "Qual é o algarismo romano para 500?", answer: "D" },
      { question: "Qual é o algarismo romano para 1000?", answer: "M" },
      { question: "Qual é o algarismo romano para 2?", answer: "II" },
      { question: "Qual é o algarismo romano para 3?", answer: "III" },
      { question: "Qual é o algarismo romano para 4?", answer: "IV" },
      { question: "Qual é o algarismo romano para 6?", answer: "VI" },
      { question: "Qual é o algarismo romano para 7?", answer: "VII" },
      { question: "Qual é o algarismo romano para 8?", answer: "VIII" },
      { question: "Qual é o algarismo romano para 9?", answer: "IX" },
      { question: "Qual é o algarismo romano para 20?", answer: "XX" },
      { question: "Qual é o algarismo romano para 30?", answer: "XXX" },
      { question: "Qual é o algarismo romano para 40?", answer: "XL" },
      { question: "Qual é o algarismo romano para 60?", answer: "LX" },
      { question: "Qual é o algarismo romano para 70?", answer: "LXX" },
      { question: "Qual é o algarismo romano para 80?", answer: "LXXX" },
      { question: "Qual é o algarismo romano para 90?", answer: "XC" },
    ];

    await Question.insertMany(questions);
    console.log("Perguntas inseridas com sucesso!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });
