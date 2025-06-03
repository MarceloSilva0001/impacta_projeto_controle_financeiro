const express = require("express");
const PaymentController = require('../controllers/PaymentController');

const router = express.Router();

// Adicione estas rotas:
router.post('/api/payment/process', PaymentController.processPayment);
router.get('/api/users/:userId/subscription', PaymentController.getUserSubscription);

module.exports = router;