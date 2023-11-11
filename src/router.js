
const express = require("express");
const router = express.Router();
const db = require("./db");

// Rota PATCH
router.patch("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const customer = req.body;
    db.updateCustomer(id, customer);
    res.sendStatus(200);
});

// Rota DELETE
router.delete("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.deleteCustomer(id);
    res.sendStatus(204);
});

// Rota POST
router.post("/clientes", (req, res) => {
    const customer = req.body;
    db.insertCustomer(customer);
    res.sendStatus(201);
});

// Rota GET (lista todos os clientes)
router.get("/clientes", (req, res) => {
    res.json(db.selectCustomers());
});

// Rota GET por ID
router.get("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.json(db.selectCustomer(id));
});



module.exports = router;