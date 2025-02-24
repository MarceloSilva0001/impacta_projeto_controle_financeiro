const express = require('express');
const { initializeDatabase } = require('./database'); // Importa a função de inicialização do banco de dados
const userRoutes = require('./routes/userRoutes'); // Importa as rotas de API de usuários
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de páginas autenticação de usuários (Cadastro e login)

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Inicializa o banco de dados e depois inicia o servidor
initializeDatabase()
  .then(() => {
    // Configuração do servidor
    app.use(userRoutes); // Usa as rotas de API usuários
    app.use(authRoutes); // Usa as rotas de autenticação de usuários

    const PORT = 8080;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o servidor:', error);
  });