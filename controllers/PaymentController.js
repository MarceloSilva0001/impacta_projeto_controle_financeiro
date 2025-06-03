const User = require('../models/User');

const PaymentController = {
  async processPayment(req, res) {
    try {
      const userId = req.body.userId; // Ou pegar do token de autenticação
      console.log(req.body)
      
      // Atualiza o usuário para premium
      await User.update(
        { subscriptionType: 'premium' },
        { where: { id: userId } }
      );

      // Retorna o novo tipo de assinatura
      return res.status(200).json({ 
        subscriptionType: 'premium',
        message: 'Pagamento processado com sucesso!'
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao processar pagamento' });
    }
  },

  async getUserSubscription(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findByPk(userId, {
        attributes: ['subscriptionType']
      });
      
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      return res.status(200).json({ 
        subscriptionType: user.subscriptionType 
      });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar assinatura' });
    }
  }
};

module.exports = PaymentController;