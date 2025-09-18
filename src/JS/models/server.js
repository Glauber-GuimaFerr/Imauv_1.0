require('dotenv').config({ path: './variaveis.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const routes = require('./routes');

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, '../../../public')));

server.use('', routes);

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}/Pages/login.html`);
}); 