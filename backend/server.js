require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const questionRoutes = require("./routes/questionRoutes");
const scoreRoutes = require("./routes/scoreRoutes");

const app = express();
app.use(cors());
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

app.listen(5000, () => console.log("Server running on port 5000"));
