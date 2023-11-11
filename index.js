// index.js

require("dotenv").config();
const express = require("express");
const router = require("./src/router");  // Ajustado o nome do arquivo
const app = express();

app.use(express.json());

// Use todas as rotas do arquivo router.js
app.use("/", router);

app.get("/", (req, res) => {
    res.json({
        message: "Olá, mundo!"
    });
});

app.listen(process.env.PORT, () => {
    console.log("Aplicação rodando");
});
