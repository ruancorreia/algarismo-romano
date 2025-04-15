require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//adicionado apos pesquisa
require("dotenv").config(); // Carrega variáveis do .env
const mongoose = require("mongoose");

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro na conexão:", err));

//fim

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://seu-frontend.vercel.app"],
  })
);


mongoose.connect(process.env.MONGO_URI);

// Rotas
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/scores', require('./routes/scoreRoutes'));

app.listen(5000, () => console.log('Server running on port 5000'));