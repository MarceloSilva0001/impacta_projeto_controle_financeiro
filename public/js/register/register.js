document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Captura os valores dos campos
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cpf = document.getElementById('cpf').value;
    const emailCadastro = document.getElementById('emailCadastro').value;
    const senhaCadastro = document.getElementById('senhaCadastro').value;

    alert('Cadastro realizado com sucesso!');
    
    // Redireciona para a tela de login após o cadastro
    window.location.href = "../login/login.html";
});
