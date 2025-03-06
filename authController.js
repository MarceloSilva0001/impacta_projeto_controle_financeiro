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
        const { email, password } = req.body; // Pegando os dados do corpo da requisição
    
        try {
            // Verificar se o usuário existe
            const user = await User.findOne({ where: { email: email } });
            let errorMessage = 'Erro ao fazer Login';
    
            // Verificar se o usuário existe
            if (!user) {
                errorMessage = "E-mail não cadastrado";
                return res.redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
            }
    
            // Verificar se a senha corresponde usando bcrypt
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                errorMessage = "Senha incorreta";
                return res.redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
            }
    
            // Senha correta, redireciona para a área logada
            return res.redirect('/inicio');
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro no servidor.');
        }
    }
    
};

module.exports = AuthController;
