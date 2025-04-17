require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const questionRoutes = require("./routes/questionRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const Score = require("./models/Score"); // Certifique-se de que o caminho está correto

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro na conexão:", err));

// Rota para a raiz
app.get("/", (req, res) => {
  res.send("API está funcionando!");
});

// Rotas
app.use("/api/questions", questionRoutes);
app.use("/api/scores", scoreRoutes);

// Rota para remover pontuação
app.delete("/api/scores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Score.findByIdAndDelete(id); // Supondo que você esteja usando Mongoose
    if (!result) {
      return res.status(404).send({ message: "Pontuação não encontrada" });
    }
    res.status(200).send({ message: "Pontuação removida com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao remover pontuação" });
  }
});

const PORT = process.env.PORT || 5000;
module.exports = app;
