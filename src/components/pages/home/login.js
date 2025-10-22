// Importações
import Msg from '/utils/msg.js'

// Variáveis importantes
const f_email = document.querySelector('#f_email')
const f_senha = document.querySelector('#f_senha')
const btn = document.querySelector('#btn_login')

const sv = 'http://localhost:3000'

// Botão de login
btn.addEventListener('click', async () => {
    await fetch(`${sv}/login/${f_email.value}/${f_senha.value}`)
    .then(res => res.json())
    .then(data => {
        if(data.status != 500){
            sessionStorage.setItem('nome_user', data[0].nome)
            sessionStorage.setItem('email_user', data[0].email)
            sessionStorage.setItem('cpf_user', data[0].cpf)
            sessionStorage.setItem('endereco_user', data[0].endereco)
            window.location.href = '/index'
        }else{
            const config = {
                titulo: "Erro",
                texto: "Servidor apresentou problemas de conexão ou funcionamento, tente novamente mais tarde.",
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
                texto: "Dados não encontrados no sistema!",
                cor: "#9c0606",
                tipo: "ok",
                ok: () => {},
                confirmar: () => {}
        }
        Msg.mostrar(config)
    })
})