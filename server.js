// Configurações backend
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'components', 'pages', 'home', 'login.html')); 
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'components', 'pages', 'index', 'index.html')); 
});

app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'components', 'pages', 'account', 'account.html')); 
});

// Login e Cadastro
app.get('/login/:email/:senha', (req, res) => { 
  const email = req.params.email;
  const senha = req.params.senha;
  const query = 'SELECT nome, email, cpf, endereco FROM agente WHERE email = ? AND senha = ?';

  connection.query(query, [email, senha],(error, results) => {
    if(error){
      console.error('Erro ao executar a query:', error);
      return res.status(500).send('Erro no servidor');
    }
    res.json(results);
  });
});

app.post('/cadastro', (req, res) => {
  const { nome, cpf, endereco, email, senha } = req.body;
  const query = 'INSERT INTO agente (nome, cpf, endereco, email, senha) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [nome, cpf, endereco, email, senha], (error, results) => {
    if(error){
      console.error('Erro ao executar a query:', error);
      return res.status(500).send('Erro ao inserir dados no servidor');
    }
    res.json(results);
  });
});

// Adicionar e Editar pontos
app.post('/adicionar', (req, res) => {
  const { n_agente, cod_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo, latitude, longitude } = req.body;
  const query = 'INSERT INTO ponto (id_ponto, n_agente, cod_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo, latitude, longitude) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(query, [n_agente, cod_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo, latitude, longitude], (error, results) => {
    if(error){
      console.error('Erro ao executar a query:', error);
      return res.status(500).send('Erro ao inserir dados no servidor');
    }
    res.json(results);
  });
});

// Dados dos pontos
app.get('/verificarpontos', (req, res) => { 
  const query = 'SELECT COUNT(*) AS quantidade FROM ponto';

  connection.query(query, (error, results) => {
    if(error){
      console.error('Erro ao executar a query:', error);
      return res.status(500).send('Erro no servidor');
    }
    res.json(results[0]);
  });
});

app.get('/todospontos', (req, res) => { 
  const query = 'SELECT cod_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo, latitude, longitude FROM ponto';

  connection.query(query, (error, results) => {
    if(error){
      console.error('Erro ao executar a query:', error);
      return res.status(500).send('Erro no servidor');
    }
    res.json(results);
  });
});

// Dados dos cards
app.get('/meuspontos/:cpf', (req, res) => { 
  const cpf = req.params.cpf;
  const query = 'SELECT nome, email, cpf, endereco FROM ponto WHERE n_agente = ?';

  connection.query(query, cpf,(error, results) => {
    if(error){
      console.error('Erro ao executar a query:', error);
      return res.status(500).send('Erro no servidor');
    }
    res.json(results);
  });
});

app.get('/historico', (req, res) => { 
  const cpf = req.params.cpf;
  const query = 'SELECT nome, email, cpf, endereco FROM ponto WHERE n_agente = ?';

  connection.query(query, cpf,(error, results) => {
    if(error){
      console.error('Erro ao executar a query:', error);
      return res.status(500).send('Erro no servidor');
    }
    res.json(results);
  });
});

// URL principal
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});