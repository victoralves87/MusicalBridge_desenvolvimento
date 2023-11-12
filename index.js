require("dotenv").config();
const express = require("express");
const path = require("path"); // Adicionando o módulo path
const router = require("./src/router");
const app = express();

// Middleware para analisar dados JSON
app.use(express.json());

// Middleware para servir arquivos estáticos do diretório 'public'
app.use(express.static(path.join(__dirname, "public")));

// Usando o roteador
app.use("/", router);

// No seu arquivo index.js
app.use(express.static(path.join(__dirname, "public")));


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
