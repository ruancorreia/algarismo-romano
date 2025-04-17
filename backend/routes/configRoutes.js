const express = require("express");
const router = express.Router();
const Config = require("../models/Config");

// Obter configurações
router.get("/", async (req, res) => {
  try {
    let config = await Config.findOne();
    if (!config) {
      config = await Config.create({ questionCount: 10 });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Atualizar configurações
router.put("/", async (req, res) => {
  try {
    const { questionCount } = req.body;
    let config = await Config.findOne();

    if (!config) {
      config = new Config();
    }

    config.questionCount = questionCount;
    await config.save();

    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
