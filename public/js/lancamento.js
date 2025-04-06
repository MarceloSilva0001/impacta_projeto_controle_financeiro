const form = document.getElementById('form-lancamento');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const descricao = document.getElementById('descricao').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const data = document.getElementById('data').value;
  const categoria = document.getElementById('categoria').value;
  const tipo = document.getElementById('tipo').value;

  const lancamento = {
    descricao,
    valor,
    data,
    categoria,
    tipo
  };

  const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];
  transacoes.push(lancamento);
  localStorage.setItem('transacoes', JSON.stringify(transacoes));

  alert("Lançamento adicionado com sucesso!");
  form.reset();
});
