const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Obter todas as perguntas
router.get("/", async (req, res) => {
  try {
    console.log("Recebida requisição GET para /api/questions");
    console.log("Headers da requisição:", req.headers);

    const questions = await Question.find().lean();
    console.log(`Encontradas ${questions.length} perguntas`);

    if (questions.length === 0) {
      console.log("Nenhuma pergunta encontrada no banco de dados");
      return res.status(200).json([]);
    }

    res.json(questions);
  } catch (error) {
    console.error("Erro detalhado ao buscar perguntas:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      error: "Erro ao buscar perguntas",
      details: error.message,
    });
  }
});

// Adicionar uma nova pergunta
router.post("/", async (req, res) => {
  try {
    console.log("Recebida requisição POST para /api/questions"); // Debug
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Erro ao adicionar pergunta:", error); // Debug
    res.status(500).json({ error: "Erro ao adicionar pergunta" });
  }
});

// Remover uma pergunta
router.delete("/:id", async (req, res) => {
  try {
    console.log("Recebida requisição DELETE para /api/questions/:id"); // Debug
    await Question.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao remover pergunta:", error); // Debug
    res.status(500).json({ error: "Erro ao remover pergunta" });
  }
});

module.exports = router;
