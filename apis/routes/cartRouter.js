const cartRouter = require('express').Router();
const { cartController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

cartRouter.get('/', loginRequired, cartController.getCart);
cartRouter.post('/', loginRequired, cartController.postCart);
cartRouter.patch('/', loginRequired, cartController.updateCart);

module.exports = cartRouter;
