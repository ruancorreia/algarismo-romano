const express = require("express");
const Score = require("../models/Score");
const router = express.Router();

router.post("/", async (req, res) => {
  const newScore = new Score(req.body);
  await newScore.save();
  res.status(201).json(newScore);
});

router.get("/", async (req, res) => {
  const scores = await Score.find().sort({ score: -1 }).limit(10);
  res.json(scores);
});

module.exports = router;
