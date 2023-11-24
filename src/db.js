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


async function findUserByEmailAndPassword(email, senha) {
  try {
    // Execute a consulta SQL para encontrar o usuário pelo email e senha
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ? AND senha = ?", [email, senha]);

    // Verifica se há um usuário com o email e senha fornecidos
    if (rows.length > 0) {
      return rows[0]; // Retorna o primeiro usuário encontrado
    } else {
      return null; // Retorna null se nenhum usuário for encontrado
    }
  } catch (error) {
    throw error; // Lança qualquer erro que ocorra durante a consulta
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
};
