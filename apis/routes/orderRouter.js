const orderRouter = require('express').Router();
const { orderController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

orderRouter.patch('/', loginRequired, orderController.orderImmediately);
orderRouter.get('/carts', loginRequired, orderController.orderInCart);

module.exports = orderRouter;
