const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool(process.env.CONNECTION_STRING);

async function insertCustomer(customer) {
  console.log('Dados Recebidos na Função insertCustomer:', customer);

  const { nome, idade, email, senha } = customer;
  await pool.query("INSERT INTO usuarios (nome, idade, email, senha) VALUES (?, ?, ?, ?)", [nome, idade, email, senha]);
}

async function selectCustomers() {
  const [rows] = await pool.query("SELECT * FROM usuarios");
  return rows;
}

async function selectCustomer(id) {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  return rows[0];
}



async function updateCustomer(id, customerData) {
  const { nome, idade, email, senha } = customerData;
  await pool.query("UPDATE usuarios SET nome=?, idade=?, email=?, senha=? WHERE id=?", [nome, idade, email, senha, id]);
}

async function deleteCustomer(id) {
  await pool.query("DELETE FROM usuarios WHERE id=?", [id]);
}

module.exports = {
  selectCustomers,
  selectCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
