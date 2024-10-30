const fs = require('fs');
const path = require('path');
const AgenteService = require('../services/ImauvService');

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
