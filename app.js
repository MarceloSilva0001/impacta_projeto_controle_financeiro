const express = require('express');
const { initializeDatabase } = require('./database'); // Inicializa banco e aplica migrations

const app = express();

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Carrega os models (importante antes das associações)
require('./models/User');
require('./models/Lancamento');

// Define os relacionamentos entre os models
require('./models/associations');

// Inicializa o banco e inicia o servidor
initializeDatabase()
  .then(() => {
    // Rotas
    const userRoutes = require('./routes/userRoutes');
    const authRoutes = require('./routes/authRoutes');
    const lancamentoRoutes = require('./routes/lancamentoRoutes'); // <-- ADICIONE ISSO

    app.use(userRoutes);
    app.use(authRoutes);
    app.use(lancamentoRoutes); // <-- E ISSO

    const PORT = 8080;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o servidor:', error);
  });
