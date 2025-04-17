require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("./models/Question"); // Certifique-se de que o caminho está correto

const questions = [
  {
    question: "Qual é o número romano para 1?",
    options: ["I", "V", "X", "L"],
    answer: "I",
  },
  {
    question: "Qual é o número romano para 5?",
    options: ["I", "V", "X", "L"],
    answer: "V",
  },
  {
    question: "Qual é o número romano para 10?",
    options: ["I", "V", "X", "L"],
    answer: "X",
  },
  {
    question: "Qual é o número romano para 50?",
    options: ["L", "C", "D", "M"],
    answer: "L",
  },
  {
    question: "Qual é o número romano para 100?",
    options: ["L", "C", "D", "M"],
    answer: "C",
  },
  {
    question: "Qual é o número romano para 500?",
    options: ["L", "C", "D", "M"],
    answer: "D",
  },
  {
    question: "Qual é o número romano para 1000?",
    options: ["L", "C", "D", "M"],
    answer: "M",
  },
  {
    question: "Como se escreve 4 em algarismos romanos?",
    options: ["IIII", "IV", "VI", "IX"],
    answer: "IV",
  },
  {
    question: "Como se escreve 9 em algarismos romanos?",
    options: ["VIIII", "IX", "XI", "XIV"],
    answer: "IX",
  },
  {
    question: "Como se escreve 40 em algarismos romanos?",
    options: ["XXXX", "XL", "LX", "XC"],
    answer: "XL",
  },
];

const seedDatabase = async () => {
  try {
    console.log("Iniciando script de seed...");
    console.log("MONGO_URI:", process.env.MONGO_URI);

    // Opções de conexão
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      family: 4,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    };

    console.log("Tentando conectar ao MongoDB...");

    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGO_URI, mongooseOptions);
    console.log("Conectado ao MongoDB com sucesso!");

    // Limpar a coleção existente
    console.log("Limpando coleção existente...");
    await Question.deleteMany({});
    console.log("Coleção limpa com sucesso!");

    // Inserir as perguntas
    console.log("Preparando para inserir perguntas...");
    await Question.insertMany(questions);
    console.log(`${questions.length} perguntas inseridas com sucesso!`);

    // Não fechar a conexão aqui
    console.log("Seed concluído com sucesso!");
  } catch (error) {
    console.error("Erro durante o seed:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    process.exit(1);
  }
};

// Executar o seed
seedDatabase();
