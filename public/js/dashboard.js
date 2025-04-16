const API_URL = 'https://localhost:808/gastosporcategoria/'; // Coloque sua API aqui
const periodo = document.getElementById('period-filter');
const tipo = document.getElementById('type-filter');
const customDate = document.getElementById('custom-date');

// Gráficos
let graficoBarra, graficoPizza;

periodo.addEventListener('change', () => {
  const isCustom = periodo.value === 'custom';
  customDate.style.display = isCustom ? 'inline' : 'none';
  carregarDados();
});

tipo.addEventListener('change', carregarDados);
customDate.addEventListener('change', carregarDados);
document.addEventListener('DOMContentLoaded', carregarDados);

async function carregarDados() {
  try {
    const response = await fetch(API_URL);
    const dados = await response.json();

    const filtrados = aplicarFiltros(dados);

    if (filtrados.length === 0) {
      console.log('Sem dados após filtragem.');
      return;
    }

    atualizarGraficos(filtrados);
  } catch (err) {
    console.error('Erro ao carregar API', err);
  }
}

function aplicarFiltros(dados) {
  const hoje = new Date();
  let inicio, fim;

  switch (periodo.value) {
    case 'this-month':
      inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
      break;
    case 'custom':
      if (!customDate.value) return [];
      const [ano, mes] = customDate.value.split('-');
      inicio = new Date(ano, mes - 1, 1);
      fim = new Date(ano, mes, 0);
      break;
  }

  return dados.filter(l => {
    const data = new Date(l.data);
    const tipoMatch = tipo.value === 'all' || l.tipo === tipo.value;
    return data >= inicio && data <= fim && tipoMatch;
  });
}

function atualizarGraficos(dados) {
  const categorias = {};
  dados.forEach(l => {
    categorias[l.categoria] = (categorias[l.categoria] || 0) + l.valor;
  });

  const labels = Object.keys(categorias);
  const valores = Object.values(categorias);

  // Gráfico de Barras
  if (graficoBarra) graficoBarra.destroy();
  graficoBarra = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Total por Categoria',
        data: valores,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Gráfico de Pizza
  if (graficoPizza) graficoPizza.destroy();
  graficoPizza = new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Distribuição por Categoria',
        data: valores,
        backgroundColor: labels.map(() =>
          `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`)
      }]
    },
    options: {
      responsive: true
    }
  });
}
