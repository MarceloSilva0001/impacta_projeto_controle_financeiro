const lista = document.getElementById('lista-transacoes');

function aplicarFiltros() {
  const anoFiltro = document.getElementById('anoFiltro').value;
  const mesFiltro = document.getElementById('mesFiltro').value;
  const tipoFiltro = document.getElementById('tipoFiltro').value;

  const transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];

  const meses = {
    "janeiro": "01",
    "fevereiro": "02",
    "marco": "03",
    "abril": "04",
    "maio": "05",
    "junho": "06",
    "julho": "07",
    "agosto": "08",
    "setembro": "09",
    "outubro": "10",
    "novembro": "11",
    "dezembro": "12"
  };

  const transacoesFiltradas = transacoes.filter(t => {
    const [ano, mes, dia] = t.data.split('-'); 
    
    const anoValido = anoFiltro ? ano === anoFiltro : true;
    const mesValido = mesFiltro ? mes === meses[mesFiltro] : true;
    const tipoValido = tipoFiltro ? t.tipo === tipoFiltro : true;
    
    return anoValido && mesValido && tipoValido;
  });

  if (transacoesFiltradas.length === 0) {
    lista.innerHTML = "<p>Nenhuma transação encontrada para os filtros selecionados.</p>";
  } else {
    const html = transacoesFiltradas.map(t => `
      <div class="transacao">
        <strong>${t.descricao}</strong><br>
        Valor: R$ ${t.valor.toFixed(2)}<br>
        Data: ${t.data}<br>
        Categoria: ${t.categoria}<br>
        Tipo: ${t.tipo.charAt(0).toUpperCase() + t.tipo.slice(1)}
      </div>
    `).join('');
    lista.innerHTML = html;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  aplicarFiltros(); 
});
