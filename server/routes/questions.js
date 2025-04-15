const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Adicionar pergunta
router.post('/', async (req, res) => {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    res.status(201).send(newQuestion);
});

// Remover pergunta
router.delete('/:id', async (req, res) => {
    await Question.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Obter perguntas
router.get('/', async (req, res) => {
    const questions = await Question.find();
    res.send(questions);
});

module.exports = router; 