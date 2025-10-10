export default class Msg {
    static config = null /* Parâmetros */

    // Renderização da caixa de mensagem
    static mostrar = (config) => {
        this.config = config

        const msgFundo = document.createElement("div")
        msgFundo.setAttribute("id", "msgFundo")

        const msg = document.createElement("div")
        msg.setAttribute("id", "msg")
        msgFundo.appendChild(msg)

        const headerMsg = document.createElement("div")
        headerMsg.setAttribute("id", "headerMsg")
        headerMsg.setAttribute("style", `background-color: ${config.cor} !important;`)
        msg.appendChild(headerMsg)

        const titulo = document.createElement("p")
        titulo.innerHTML = config.titulo
        headerMsg.appendChild(titulo)

        const bodyMsg = document.createElement("div")
        bodyMsg.setAttribute("id", "bodyMsg")
        msg.appendChild(bodyMsg)

        const texto = document.createElement("p")
        texto.innerHTML = config.texto
        bodyMsg.appendChild(texto)

        const footerMsg = document.createElement("div")
        footerMsg.setAttribute("id", "footerMsg")
        msg.appendChild(footerMsg)

        if(config.tipo == "ok"){
            const btnOkMsg = document.createElement("button")
            btnOkMsg.setAttribute("id", "btnOkMsg")
            btnOkMsg.setAttribute("class", "btnMsg")
            btnOkMsg.innerHTML = "Ok"
            btnOkMsg.addEventListener("click", () => {
                config.ok()
                this.fechar()
            })
            footerMsg.appendChild(btnOkMsg)
        }else if(config.tipo == "confirmar"){
            const btnConfirmarMsg = document.createElement("button")
            btnConfirmarMsg.setAttribute("id", "btnConfirmarMsg")
            btnConfirmarMsg.setAttribute("class", "btnMsg")
            btnConfirmarMsg.innerHTML = "Confirmar"
            btnConfirmarMsg.addEventListener("click", () => {
                config.confirmar()
                this.fechar()
            })
            footerMsg.appendChild(btnConfirmarMsg)

            const btnCancelarMsg = document.createElement("button")
            btnCancelarMsg.setAttribute("class", "btnMsg")
            btnCancelarMsg.innerHTML = "Cancelar"
            btnCancelarMsg.addEventListener("click", () => {
                config.ok()
                this.fechar()
            })
            footerMsg.appendChild(btnCancelarMsg)
        }

        document.body.prepend(msgFundo)
    }

    // Função de fechar a caixa de mensagem
    static fechar = () => {
        document.getElementById("msgFundo").remove()
    }
}

// ImauvController
/*
const fs = require('fs');
const path = require('path');
const AgenteService = require('../../JS/services/ImauvService');

const USER_DATA_FILE = path.join(__dirname, 'user_data.json');

const saveUserData = (data) => {
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(data, null, 2));
};

const getUserData = () => {
    if (fs.existsSync(USER_DATA_FILE)) {
        const rawData = fs.readFileSync(USER_DATA_FILE);
        return JSON.parse(rawData);
    }
    return null;
};

module.exports = {
    login: async (req, res) => {
        const { email, senha } = req.body;

        if (email && senha) {
            let agente = await AgenteService.buscarPorEmail(email);

            if (agente && agente.senha === senha) {
                saveUserData(agente);
                res.json({ success: true });
            } else {
                res.json({ success: false, message: 'Credenciais inválidas' });
            }
        } else {
            res.json({ success: false, message: 'Campos não enviados' });
        }
    },

    register: async (req, res) => {
        const { nome, cpf, endereco, email, senha } = req.body;

        if (nome && cpf && endereco && email && senha) {
            try {
                await AgenteService.inserir(nome, cpf, endereco, email, senha);
                res.json({ success: true });
            } catch (error) {
                res.json({ success: false, message: 'Erro ao registrar' });
            }
        } else {
            res.json({ success: false, message: 'Campos não enviados' });
        }
    },

    me: (req, res) => {
        const user = getUserData();
        if (user) {
            res.json({ success: true, user });
        } else {
            res.json({ success: false, message: 'Usuário não autenticado' });
        }
    },

    addPoint: async (req, res) => {
        const { n_agente, num_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo, latitude, longitude } = req.body;
        const user = getUserData();
        
        if (!user) {
            return res.json({ success: false, message: 'Usuário não autenticado' });
          }
    
        if (n_agente && num_processo && data_inicio && descricao && localizacao && classificacao && etapa && prazo && latitude && longitude) {
            try {
                await AgenteService.inserirPonto(n_agente, num_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo, latitude, longitude);          
                res.json({ success: true });
            } catch (error) {
                res.json({ success: false, message: 'Erro ao adicionar ponto' });
            }
        } else {
            res.json({ success: false, message: 'Ponto não enviado'});
        }
    },

    getPoints: async (req, res) => {
        try {
            const points = await AgenteService.buscarTodos();
            res.json({ success: true, points });
        } catch (error) {
            res.json({ success: false, message: 'Erro ao buscar pontos' });
        }
    },

    editPoints: async (req, res) => {
        const { num_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo } = req.body;
        const user = getUserData();
        
        if (!user) {
            return res.json({ success: false, message: 'Usuário não autenticado' });
        }
    
        if (num_processo && data_inicio && descricao && localizacao && classificacao && etapa && prazo) {
            try {
                const result = await AgenteService.editarPontos(num_processo, data_inicio, descricao, localizacao, classificacao, etapa, prazo);
                if (result.affectedRows > 0) {
                    res.json({ success: true });
                } else {
                    res.json({ success: false, message: 'Ponto não encontrado' });
                }
            } catch (error) {
                res.json({ success: false, message: 'Erro ao editar ponto' });
            }
        } else {
            res.json({ success: false, message: 'Dados incompletos' });
        }
    }   
};
*/





// Models
/*
const express = require('express');
const router = express.Router();

const ImauvController = require('../controllers/ImauvController');

router.post('/login',ImauvController.login);
router.post('/register', ImauvController.register);
router.get('/me', ImauvController.me);
router.post('/addPoint', ImauvController.addPoint);
router.get('/getPoints', ImauvController.getPoints);
router.put('/editPoint', ImauvController.editPoints);

module.exports = router;
*/





// ImauvService
/*
const db = require('../../utils/models/db');

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
*/