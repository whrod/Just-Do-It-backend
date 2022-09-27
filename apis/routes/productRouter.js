const productRouter = require('express').Router();
const { productController } = require('../controllers');
const { checkUserId } = require('../utils/auth')

productRouter.get('/:productId', checkUserId, productController.getDetail);

module.exports = productRouter;
