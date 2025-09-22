async function carregarDados() {
    const response = await fetch('/me');
    const data = await response.json();

    if (data.success) {
        document.getElementById('nome').textContent = data.user.nome;
        document.getElementById('email').textContent = data.user.email;
        document.getElementById('cpf').textContent = data.user.cpf;
        document.getElementById('cidade').textContent = data.user.endereco;
    } else {
        alert('Erro ao carregar dados do usuário');
        window.location.href = '/Pages/login.html';
    }
}

document.addEventListener('DOMContentLoaded', carregarDados);