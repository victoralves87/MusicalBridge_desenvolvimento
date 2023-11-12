const express = require("express");
const path = require("path");
const router = require("./src/router");
const app = express();

// Middleware para analisar dados JSON
app.use(express.json());

// Middleware para analisar dados de formulário
app.use(express.urlencoded({ extended: true }));

// Usando o roteador
app.use("/", router);

// Rota principal
app.get("/", (req, res) => {
  res.json({
    message: "Olá, mundo!"
  });
});

// Iniciando a aplicação
app.listen(process.env.PORT, () => {
  console.log(`Aplicação rodando na porta ${process.env.PORT}`);
});