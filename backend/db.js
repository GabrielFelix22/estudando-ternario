const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // ou o IP do seu MySQL
  user: 'root', // ex: root
  password: '', // ex: root123
  database: 'estudante', // o banco que você está usando
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('🚀 Conectado ao banco de dados MySQL!');
});

module.exports = connection;
