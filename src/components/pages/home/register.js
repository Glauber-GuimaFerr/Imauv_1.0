// Importações
import Msg from '/utils/msg.js'

// Variáveis importantes
const f_nome = document.querySelector('#f_nome').value == '' ? null : document.querySelector('#f_nome').value
const f_cpf = document.querySelector('#f_cpf').value == '' ? null : document.querySelector('#f_cpf').value
const f_endereco = document.querySelector('#f_endereco').value 
const f_email = document.querySelector('#f_email').value == '' ? null : document.querySelector('#f_email').value
const f_senha = document.querySelector('#f_senha').value == '' ? null : document.querySelector('#f_senha').value
const btn = document.querySelector('#btn_sign')

const sv = 'http://localhost:3000'

// Botão de cadastro
btn.addEventListener('click', () => {
    const dados = {
        nome: f_nome,
        cpf: f_cpf,
        endereco: f_endereco,
        email: f_email,
        senha: f_senha
    }

    const header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }    

    fetch(`${sv}/cadastro`, header)
    .then(res => {
        if(res.status != 500){
            window.location.href = '/login.html'
        }else{
            const config = {
                titulo: "Erro",
                texto: "Dados não podem ser cadastrados!",
                cor: "#9c0606",
                tipo: "ok",
                ok: () => {},
                confirmar: () => {}
            }
            Msg.mostrar(config)
        }
    })
    .catch(err => {
        console.log(err)
        const config = {
            titulo: "Erro",
            texto: "Servidor apresentou problemas de conexão ou funcionamento, tente se cadastrar mais tarde.",
            cor: "#9c0606",
            tipo: "ok",
            ok: () => {},
            confirmar: () => {}
        }
        Msg.mostrar(config)
    })
})