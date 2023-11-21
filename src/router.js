const express = require("express");
const router = express.Router();
const db = require("./db");
const path = require("path");



// Rota GET para a página inicial (home)
router.get("/", (req, res) => {
  // Redireciona para a rota do formulário
  res.redirect("/home");
});

router.get("/home.ejs", (req, res) => {
  // Redireciona para a rota do formulário
  res.redirect("/home");
});

// Rota GET para o home
router.get("/home", (req, res) => {
  // Renderiza a página do formulário
  const indexPath = path.join(__dirname, "../", "views", "home.ejs");
  res.render(indexPath); // Use res.render para renderizar um arquivo EJS
});

// Rota GET para a página de músicos
router.get("/musicos.ejs", (req, res) => {
  // Lógica para renderizar a página de músicos
  res.render("musicos");
});

// Rota GET para a página de eventos
router.get("/eventos.ejs", (req, res) => {
  // Lógica para renderizar a página de eventos
  res.render("eventos");
});

// Rota GET para a página de login
router.get("/login.ejs", (req, res) => {
  // Lógica para renderizar a página de login
  res.render("login");
});

// Rota GET para a página de cadastro
router.get("/cadastre.ejs", (req, res) => {
  // Lógica para renderizar a página de cadastro
  res.render("cadastre");
});

// Rota GET para a página de sobre
router.get("/sobre.ejs", (req, res) => {
  // Lógica para renderizar a página de cadastro
  res.render("sobre");
});

// Rota GET para a página de login
router.get("/login.ejs", (req, res) => {
  // Lógica para renderizar a página de login com a possível mensagem de erro
  res.render("login", { error: req.query.error || undefined });
});









// Rota POST para o login
router.post("/usuarios/login", async (req, res) => {
  const user = req.body;

  try {
    // Verifica se o email e a senha correspondem a um registro no banco de dados
    const userFromDB = await db.findUserByEmailAndPassword(user.email, user.senha);

    if (userFromDB) {
      // Redireciona para a página home.ejs em caso de sucesso
      res.redirect("/home");
    } else {
      // Adicione um console.log para verificar o fluxo de controle e mensagens de erro
      console.log("Usuário não encontrado");
      res.redirect("/login.ejs?error=Email ou senha incorretos");
    }
  } catch (error) {
    // Adicione um console.log para verificar se há erros durante o processo
    console.error("Erro durante o login:", error);
    res.redirect("/login.ejs?error=Ocorreu um erro durante o login");
  }
});

//ROTA POST PARA O CADASTRO
router.post("/usuarios", async (req, res) => {
  const user = req.body;

  await db.insertCustomer(user);

  // Responde com o status 201 (Created) indicando que a criação do recurso foi bem-sucedida
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
