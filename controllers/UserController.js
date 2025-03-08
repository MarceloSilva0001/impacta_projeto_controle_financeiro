const User = require('../models/User');
const path = require('path');
const { ValidationError, UniqueConstraintError } = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rounds para gerar o salt

const UserController = {
  // Criar um novo usuário
  async createUser(req, res) {
    console.log(req.body);
    try {
        const { name, email, cpf, dateOfBirth, password } = req.body;

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Criar o usuário com a senha criptografada
        const user = await User.create({
            name,
            email,
            cpf,
            dateOfBirth,
            password: hashedPassword, // Armazenar a senha criptografada
        });

        res.status(201).sendFile(path.join(__dirname, '../views/auth/login.html'));
    } catch (error) {
        let errorMessage = 'Erro ao criar usuário';
        if (error instanceof UniqueConstraintError) {
            errorMessage = 'Erro de unicidade: ' + error.errors.map(e => e.message).join(', ');
        } else if (error instanceof ValidationError) {
            errorMessage = 'Erro de validação: ' + error.errors.map(e => e.message).join(', ');
        }
        console.log(error);
        res.redirect(`/register?error=${encodeURIComponent(errorMessage)}`);
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

        // Buscar o usuário
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Se uma nova senha for fornecida, criptografá-la
        let hashedPassword = user.password; // Manter a senha atual por padrão
        if (password) {
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }

        // Atualizar o usuário
        await user.update({
            name,
            email,
            cpf,
            dateOfBirth,
            password: hashedPassword, // Atualizar a senha criptografada
        });

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
