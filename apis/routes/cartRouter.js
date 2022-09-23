const cartRouter = require('express').Router();
const { cartController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

cartRouter.get('/', loginRequired, cartController.getCart);

module.exports = cartRouter;
