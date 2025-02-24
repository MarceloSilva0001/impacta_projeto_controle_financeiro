document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Login realizado com sucesso!');
    window.location.href = "../dashboard.html"; // Redireciona para a página principal
});
