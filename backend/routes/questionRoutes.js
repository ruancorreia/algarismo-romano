const express = require("express");
const Question = require("../models/Question");
const router = express.Router();

router.get("/", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

router.post("/", async (req, res) => {
  const newQuestion = new Question(req.body);
  await newQuestion.save();
  res.status(201).json(newQuestion);
});

router.delete("/:id", async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
