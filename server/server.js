const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questions');
const rankingRoutes = require('./routes/ranking');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/romanQuiz', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/questions', questionRoutes);
app.use('/api/ranking', rankingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 