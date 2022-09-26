const productRouter = require('express').Router();
const { productController } = require('../controllers');

productRouter.get('/:productId', productController.getDetail);

module.exports = productRouter;
