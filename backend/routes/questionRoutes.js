const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Obter todas as perguntas
router.get("/", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// Adicionar uma nova pergunta
router.post("/", async (req, res) => {
  const newQuestion = new Question(req.body);
  await newQuestion.save();
  res.status(201).json(newQuestion);
});

// Remover uma pergunta
router.delete("/:id", async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
