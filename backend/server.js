require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const questionRoutes = require("./routes/questionRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const configRoutes = require("./routes/configRoutes");
const Score = require("./models/Score");

// Configuração do CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
};

console.log("Configuração CORS:", corsOptions);
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Adicionar headers CORS manualmente
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL || "http://localhost:5173"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cors(corsOptions));
app.use(express.json());

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Configurações do Mongoose
mongoose.set("strictQuery", false);

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

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");

    // Eventos de conexão
    mongoose.connection.on("connected", () => {
      console.log("Mongoose conectado ao MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Erro na conexão do Mongoose:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose desconectado do MongoDB");
    });

    // Popula o banco de dados se necessário
    require("./seed.js");
  })
  .catch((err) => {
    console.error("Erro na conexão com o MongoDB:", err);
    process.exit(1);
  });

// Rota para a raiz
app.get("/", (req, res) => {
  res.send("API está funcionando!");
});

// Rotas
app.use("/api/questions", questionRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/config", configRoutes);

// Rota para remover pontuação
app.delete("/api/scores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Score.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Pontuação não encontrada" });
    }
    res.status(200).send({ message: "Pontuação removida com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao remover pontuação" });
  }
});

const PORT = process.env.PORT || 5001;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
  console.log(`URL da API: http://localhost:${PORT}/api`);
  console.log(`URL do frontend: ${process.env.FRONTEND_URL}`);
});

// Manter o processo rodando
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Conexão com MongoDB fechada devido ao encerramento da aplicação"
    );
    process.exit(0);
  });
});

module.exports = app;
