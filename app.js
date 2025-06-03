const express = require('express');
const { initializeDatabase } = require('./database'); // Inicializa banco e aplica migrations
const { sequelize } = require('./database'); // Importamos o sequelize diretamente

const app = express();

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Carrega os models (importante antes das associações)
require('./models/User');
require('./models/Lancamento');
require('./models/Categoria');

// Define os relacionamentos entre os models
require('./models/associations');

// Função para executar seeders
async function runSeeders() {
  try {
    // Verifica se a tabela Categorias está vazia
    const categorias = await sequelize.models.Categoria.count();
    
    if (categorias === 0) {
      console.log('Executando seeders...');
      const { exec } = require('child_process');
      
      await new Promise((resolve, reject) => {
        exec('npx sequelize-cli db:seed:all', (error, stdout, stderr) => {
          if (error) {
            console.error('Erro ao executar seeders:', error);
            return reject(error);
          }
          console.log('Seeders executados com sucesso!');
          resolve();
        });
      });
    }
  } catch (error) {
    console.error('Erro ao verificar/executar seeders:', error);
  }
}

// Inicializa o banco e inicia o servidor
initializeDatabase()
  .then(async () => {
    // Executa seeders após as migrações
    await runSeeders();

    // Rotas
    const userRoutes = require('./routes/userRoutes');
    const authRoutes = require('./routes/authRoutes');
    const lancamentoRoutes = require('./routes/lancamentoRoutes');
    const categoriaRoutes = require('./routes/categoriaRoutes');
    const payment = require('./routes/payment');

    app.use(userRoutes);
    app.use(authRoutes);
    app.use(lancamentoRoutes);
    app.use(categoriaRoutes);
    app.use(payment);

    const PORT = 8080;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o servidor:', error);
  });