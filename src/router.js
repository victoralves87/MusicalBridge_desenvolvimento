const express = require("express");
const router = express.Router();
const db = require("./db");

// Rota PATCH
router.patch("/clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const customer = req.body;
  await db.updateCustomer(id, customer);
  res.sendStatus(200);
});

// Rota DELETE
router.delete("/clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await db.deleteCustomer(id);
  res.sendStatus(204);
});

// Rota POST
router.post("/clientes", async (req, res) => {
  const customer = req.body;
  await db.insertCustomer(customer);
  res.sendStatus(201);
});

// Rota GET (lista todos os clientes)
router.get("/clientes", async (req, res) => {
  const results = await db.selectCustomers();
  res.json(results);
});

// Rota GET por ID
router.get("/clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await db.selectCustomer(id);
  res.json(result);
});

module.exports = router;
