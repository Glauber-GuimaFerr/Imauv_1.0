const f_nome = document.querySelector('#f_nome')
const f_cpf = document.querySelector('#f_cpf')
const f_endereco = document.querySelector('#f_endereco') 
const f_email = document.querySelector('#f_email') 
const f_senha = document.querySelector('#f_senha')
const btn = document.querySelector('#btn_sign')

const sv = 'http://localhost:3000'

btn.addEventListener('click', () => {
    const dados = {
        nome: f_nome.value,
        cpf: f_cpf.value,
        endereco: f_endereco.value,
        email: f_email.value,
        senha: f_senha.value
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
            alert('Erro')
        }
    })
    .catch(err => console.log(err))
})