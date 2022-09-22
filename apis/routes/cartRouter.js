const cartRouter = require('express').Router();
const { cartController } = require('../controllers');

cartRouter.get('/:userId', cartController.getCart);
// cartRouter.post('/', cartController.postCart);
// cartRouter.patch('/', cartController.patchCart);
// cartRouter.delete('/', cartController.deleteCart);

module.exports = cartRouter;
