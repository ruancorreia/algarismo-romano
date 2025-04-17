require("dotenv").config();
const mongoose = require("mongoose");

console.log("Testando conexão com o MongoDB...");
console.log("MONGO_URI:", process.env.MONGO_URI);

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  family: 4,
  ssl: true,
  sslValidate: true,
  retryWrites: true,
  w: "majority",
};

// Configurar o Mongoose para usar IPv4
mongoose.set("strictQuery", false);

// Adicionar listener de eventos para debug
mongoose.connection.on("connecting", () =>
  console.log("Conectando ao MongoDB...")
);
mongoose.connection.on("connected", () => console.log("Conectado ao MongoDB!"));
mongoose.connection.on("error", (err) =>
  console.error("Erro na conexão:", err)
);
mongoose.connection.on("disconnected", () =>
  console.log("Desconectado do MongoDB")
);

mongoose
  .connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
    return mongoose.connection.db.listCollections().toArray();
  })
  .then((collections) => {
    console.log(
      "Coleções disponíveis:",
      collections.map((c) => c.name)
    );
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Conexão fechada com sucesso!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Erro durante o teste de conexão:");
    console.error("Mensagem:", err.message);
    console.error("Código:", err.code);
    console.error("Nome:", err.name);
    console.error("Stack:", err.stack);
    process.exit(1);
  });
