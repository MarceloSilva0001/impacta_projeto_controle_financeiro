const User = require('../models/User');
const path = require('path');

const AuthController = {
     register(req, res) {
        res.sendFile(path.join(__dirname, '../views/auth/register.html'));
    },

    login(req, res) {
        res.sendFile(path.join(__dirname, '../views/auth/login.html'));
    }
}


module.exports = AuthController;