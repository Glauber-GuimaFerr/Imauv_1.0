// AgenteService.js
const db = require('../models/db');

module.exports = {
    buscarPorEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM agente WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    },

    inserir: (nome, cpf, endereco, email, senha) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO agente (nome, cpf, endereco, email, senha) VALUES (?, ?, ?, ?, ?)', [nome, cpf, endereco, email, senha], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    },

    inserirPonto: (n_agente, num_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo, latitude, longitude) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO ponto (n_agente, num_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [n_agente, num_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo, latitude, longitude], 
            (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    },

    editarPontos: (num_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE ponto SET num_processo = ?, data_inicio = ?, descricao = ?, localizacao = ?, classificacao = ?, etapa = ?, prazo = ? WHERE num_processo = ?', 
            [num_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo], 
            (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    },
   
    buscarTodos: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM ponto', (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
};