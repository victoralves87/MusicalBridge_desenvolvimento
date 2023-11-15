const express = require("express");
const path = require("path");
const router = require("./src/router");
const app = express();

// Middleware para analisar dados JSON
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para analisar dados de formulário
app.use(express.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos (CSS, imagens, etc.) da pasta "assets"
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/js", express.static(path.join(__dirname, "assets", "js")));

// Middleware para servir imagens da pasta "imagem site"
app.use("/imagens-site", express.static(path.join(__dirname, "imagens-site")));

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
