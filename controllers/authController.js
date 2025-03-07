const User = require('../models/User');
const path = require('path');

const AuthController = {
    register(req, res) {
        res.sendFile(path.join(__dirname, '../views/auth/register.html'));
    },

    login(req, res) {
        res.sendFile(path.join(__dirname, '../views/auth/login.html'));
    },

    authLogin(req, res) {
        const { email, password } = req.body;  // Pegando os dados do corpo da requisição
    
        // Verificar se o usuário existe
        User.findOne({ where: { email: email } })  // Agora, o where está corretamente configurado
            .then(user => {
                let errorMessage = 'Erro ao fazer Login';
    
                // Verificar se o usuário existe
                if (!user) {
                    errorMessage = "E-mail não cadastrado";
                    return res.redirect(`/login?error=${encodeURIComponent(errorMessage)}`);  // Usando return aqui para interromper a execução
                }
    
                // Verificar se a senha corresponde
                if (user.password !== password) {
                    errorMessage = "Senha incorreta";
                    return res.redirect(`/login?error=${encodeURIComponent(errorMessage)}`);  // Usando return aqui também
                }
    
                // Senha correta, redireciona para a área logada
                return res.redirect('/inicio');
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send('Erro no servidor.');
            });
    }
    
};

module.exports = AuthController;
