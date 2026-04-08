const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./tasks.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      senha TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      descricao TEXT,
      status TEXT
    )
  `);
});

module.exports = db;