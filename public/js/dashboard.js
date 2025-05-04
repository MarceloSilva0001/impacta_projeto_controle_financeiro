const userId = localStorage.getItem("userId");
console.log(userId)
const apiUrl = `http://localhost:8080/lancamentos/${userId}`;

let receitaChart, despesaChart;

async function carregarLancamentos() {
  try {
    const response = await fetch(apiUrl);
    const dados = await response.json();

    const receitas = {};
    const despesas = {};

    dados.forEach(lancamento => {
      const { valor, tipo, categoria } = lancamento;
      const nomeCategoria = categoria.nome;

      if (tipo === 'receita') {
        receitas[nomeCategoria] = (receitas[nomeCategoria] || 0) + valor;
      } else if (tipo === 'despesa') {
        despesas[nomeCategoria] = (despesas[nomeCategoria] || 0) + valor;
      }
    });

    desenharGrafico(receitas, 'receitaChart', 'Receitas por Categoria', 'pie');
    desenharGrafico(despesas, 'despesaChart', 'Despesas por Categoria', 'bar');

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

function desenharGrafico(dados, canvasId, titulo, tipo) {
  const ctx = document.getElementById(canvasId).getContext('2d');

  const labels = Object.keys(dados);
  const valores = Object.values(dados);

  const cores = labels.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`);

  // Destroi gráfico antigo se existir
  if (canvasId === 'receitaChart' && receitaChart) receitaChart.destroy();
  if (canvasId === 'despesaChart' && despesaChart) despesaChart.destroy();

  const chart = new Chart(ctx, {
    type: tipo,
    data: {
      labels: labels,
      datasets: [{
        label: titulo,
        data: valores,
        backgroundColor: cores,
        borderColor: '#fff',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: tipo === 'pie' ? 'bottom' : 'top',
        },
        title: {
          display: true,
          text: titulo
        }
      }
    }
  });

  if (canvasId === 'receitaChart') receitaChart = chart;
  if (canvasId === 'despesaChart') despesaChart = chart;
}

carregarLancamentos();
