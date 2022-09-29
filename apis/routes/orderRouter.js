const orderRouter = require('express').Router();
const { orderController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

orderRouter.post('/', loginRequired, orderController.orderInDetail);
orderRouter.post('/carts', loginRequired, orderController.orderInCart);

module.exports = orderRouter;
