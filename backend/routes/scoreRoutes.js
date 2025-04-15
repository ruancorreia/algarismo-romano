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

module.exports = router;
