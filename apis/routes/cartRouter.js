const cartRouter = require('express').Router();
const { cartController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

cartRouter.get('/', loginRequired, cartController.getCart);
// cartRouter.post('/', cartController.postCart);
// cartRouter.patch('/', cartController.patchCart);
// cartRouter.delete('/', cartController.deleteCart);

module.exports = cartRouter;
