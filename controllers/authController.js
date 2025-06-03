const User = require('../models/User');
const path = require('path');
const bcrypt = require('bcrypt');

const AuthController = {
    register(req, res) {
        res.sendFile(path.join(__dirname, '../views/auth/register.html'));
    },

    login(req, res) {
        res.sendFile(path.join(__dirname, '../views/auth/login.html'));
    },

    async authLogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(401).json({ error: "E-mail não cadastrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        // Login bem-sucedido: retornando ID e subscriptionType
        return res.status(200).json({ 
            userId: user.id,
            subscriptionType: user.subscriptionType
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro no servidor.' });
    }
    }
};

module.exports = AuthController;
