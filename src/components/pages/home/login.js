const f_email = document.querySelector('#f_email')
const f_senha = document.querySelector('#f_senha')
const btn = document.querySelector('#btn_login')

const sv = 'http://localhost:3000'

btn.addEventListener('click', () => {
    fetch(`${sv}/login/${f_email.value}/${f_senha.value}`)
    .then(res => res.json())
    .then(data => {
        if(data.status != 500){
            sessionStorage.setItem('nome_user', data[0].nome)
            sessionStorage.setItem('email_user', data[0].email)
            sessionStorage.setItem('cpf_user', data[0].cpf)
            sessionStorage.setItem('endereco_user', data[0].endereco)
            window.location.href = '/index'
        }else{
            alert('Erro')
        }
    })
    .catch(err => console.log(err))
})