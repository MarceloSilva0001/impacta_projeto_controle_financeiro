const User = require('../models/User');

const UserController = {
  // Criar um novo usuário
  async createUser(req, res) {
    try {
      const { name, email, cpf, dateOfBirth, password } = req.body;
      const user = await User.create({ name, email, cpf, dateOfBirth, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
  },

  // Buscar todos os usuários
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
    }
  },

  // Buscar um usuário por ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
    }
  },

  // Atualizar um usuário
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, cpf, dateOfBirth, password } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      await user.update({ name, email, cpf, dateOfBirth, password });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
    }
  },

  // Deletar um usuário
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      await user.destroy();
      res.status(204).send(); // 204 = No Content
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
    }
  },
};

module.exports = UserController;