const productRouter = require('express').Router();
const { productController } = require('../controllers');


productRouter.get('/:productId', productController.getDetail);
productRouter.get('', productController.getProducts);


module.exports = productRouter;
