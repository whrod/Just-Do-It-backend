const orderRouter = require('express').Router();
const { orderController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

orderRouter.patch('/', loginRequired, orderController.orderImmediately);

module.exports = orderRouter;
