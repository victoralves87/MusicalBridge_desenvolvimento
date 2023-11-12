const express = require("express");
const router = express.Router();
const db = require("./db");
const path = require("path");

// Rota GET para a página inicial (formulário)
router.get("/", (req, res) => {
  // Redireciona para a rota do formulário
  res.redirect("/formulario");
});

// Rota GET para o formulário
router.get("/formulario", (req, res) => {
  // Renderiza a página do formulário
  const indexPath = path.join(__dirname, "..", "public", "index.html");
  res.sendFile(indexPath);
});

// Rota POST
router.post("/usuarios", async (req, res) => {
  const user = req.body;

  if (!user.nome || !user.idade || !user.email || !user.senha) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  await db.insertCustomer(user);
  res.sendStatus(201);
});

// Rota PATCH
router.patch("/usuarios/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const customer = req.body;
  await db.updateCustomer(id, customer);
  res.sendStatus(200);
});

// Rota DELETE
router.delete("/usuarios/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await db.deleteCustomer(id);
  res.sendStatus(204);
});


// Rota GET (lista todos os clientes)
router.get("/usuarios", async (req, res) => {
  const results = await db.selectCustomers();
  res.json(results);
});

// Rota GET por ID
router.get("/usuarios/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await db.selectCustomer(id);
  res.json(result);
});

module.exports = router;
