const path = require('path');

const HomeController = {
  // Criar um novo usuário
  async index(req, res) {
    res.status(201).sendFile(path.join(__dirname, '../views/pages/index.html'));
  }

};

module.exports = HomeController;
