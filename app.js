const express = require('express');
const { initializeDatabase } = require('./database'); // Importa a função de inicialização do banco de dados
const userRoutes = require('./routes/userRoutes'); // Importa as rotas de usuários

const app = express();

// Middleware para lidar com JSON no corpo das requisições
app.use(express.json());

// Inicializa o banco de dados e depois inicia o servidor
initializeDatabase()
  .then(() => {
    // Configuração do servidor
    app.use(userRoutes); // Usa as rotas de usuários

    const PORT = 8080;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o servidor:', error);
  });