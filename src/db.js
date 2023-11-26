const mysql = require("mysql2/promise");
require("dotenv").config();


const pool = mysql.createPool(process.env.CONNECTION_STRING);


async function customerExistsByEmail(email) {
  const [rows, fields] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows.length > 0; // Retorna true se o usuário existir, false caso contrário
}


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
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null; // Retorna null se nenhum usuário for encontrado
    }
  } catch (error) {
    throw error; // Lança qualquer erro que ocorra durante a consulta
  }
}

async function findUserByEmail(email) {
  const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows.length > 0 ? rows[0] : null;
}


async function updateCustomer(id, customerData) {
  const { nome, idade, email, senha } = customerData;
  await pool.query("UPDATE usuarios SET nome=?, idade=?, email=?, senha=? WHERE id=?", [nome, idade, email, senha, id]);
}

async function deleteCustomer(id) {
  await pool.query("DELETE FROM usuarios WHERE id=?", [id]);
}


async function findUserByEmailAndPassword(email, senha) {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ? AND senha = ?", [email, senha]);

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao encontrar usuário por e-mail e senha:", error);
    throw new Error("Erro durante a autenticação do usuário");
  }
}

module.exports = {
  selectCustomers,
  selectCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
  findUserByEmailAndPassword,
  customerExistsByEmail,
  findUserByEmail,
  
};
