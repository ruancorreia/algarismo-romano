const express = require("express");
const router = express.Router();
const Score = require("../models/Score");

// Obter todos os scores
router.get("/", async (req, res) => {
  const scores = await Score.find().sort({ score: -1 }); // Ordena por pontuação
  res.json(scores);
});

// Adicionar um novo score
router.post("/", async (req, res) => {
  const newScore = new Score(req.body);
  await newScore.save();
  res.status(201).json(newScore);
});

// Rota para remover pontuação
router.delete("/:id", async (req, res) => {
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

module.exports = router;
