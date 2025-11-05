// Importações
import Msg from '/utils/msg.js'

// Variáveis importantes
const nome = document.getElementById('nome')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')
const cidade = document.getElementById('cidade')
const btnReturn = document.getElementById('return')
const btnLogoff = document.getElementById('logoff')

const sv = 'http://localhost:3000'

// Botão de retorno
btnReturn.addEventListener('click', () => {
    window.location.href = '/index'
})

// Botão de logoff
btnLogoff.addEventListener('click', () => {
    sessionStorage.removeItem('nome_user')
    sessionStorage.removeItem('email_user')
    sessionStorage.removeItem('cpf_user')
    sessionStorage.removeItem('endereco_user')
    window.location.href = '/login.html'
})

// Dados do usuário
fetch(`${sv}/usuario/${sessionStorage.getItem('cpf_user')}`)
.then(res => res.json())
.then(data => {
    nome.innerHTML = data[0].nome
    email.innerHTML = data[0].email
    cpf.innerHTML = data[0].cpf
    cidade.innerHTML = data[0].endereco
})
.catch(err => {
    console.log(err)
    const config = {
            titulo: "Erro",
            texto: "Dados não encontrados no sistema!",
            cor: "#9c0606",
            tipo: "ok",
            ok: () => {},
            confirmar: () => {}
    }
    Msg.mostrar(config)
})