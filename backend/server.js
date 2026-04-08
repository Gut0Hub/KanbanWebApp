const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* TESTE */
app.get('/', (req, res) => {
  res.send("API funcionando 🚀");
});

/* CRIAR USUÁRIO (pra testar login) */
app.get('/criar-user', (req, res) => {
  db.run(
    "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
    ["admin@email.com", "123"],
    () => res.send("Usuário criado!")
  );
});

/* LOGIN */
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get(
    "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
    [email, senha],
    (err, user) => {
      if (user) res.json(user);
      else res.status(401).json({ erro: "Login inválido" });
    }
  );
});

/* CRIAR TAREFA */
app.post('/tarefas', (req, res) => {
  const { titulo, descricao, status } = req.body;

  db.run(
    "INSERT INTO tarefas (titulo, descricao, status) VALUES (?, ?, ?)",
    [titulo, descricao, status],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

/* LISTAR TAREFAS */
app.get('/tarefas', (req, res) => {
  db.all("SELECT * FROM tarefas", [], (err, rows) => {
    res.json(rows);
  });
});

/* ATUALIZAR STATUS */
app.put('/tarefas/:id', (req, res) => {
  const { status } = req.body;

  db.run(
    "UPDATE tarefas SET status = ? WHERE id = ?",
    [status, req.params.id],
    () => res.json({ sucesso: true })
  );
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});