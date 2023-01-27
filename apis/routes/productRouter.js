const productRouter = require('express').Router();
const { productController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Filter & Sort Products
 *     description: Filter and sorting in the entire product list
 *     tags:
 *       - Product
 *     parameters:
 *       - $ref: '#/components/parameters/Offset'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/Sort'
 *       - $ref: '#/components/parameters/Size'
 *       - $ref: '#/components/parameters/Color'
 *       - $ref: '#/components/parameters/Brand'
 *     responses:
 *       200:
 *         description: Product list page loaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/productList'
 *       400:
 *         $ref: '#/components/responses/400'
 *       5XX:
 *         $ref: '#/components/responses/5XX'
 */
productRouter.get('', productController.getProducts);

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get Detail Page Of the Selected Product
 *     description: Selected product detail information & Related products
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref : '#/components/parameters/productId'
 *     responses:
 *       200:
 *         description: Successfully load product detail page.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductDetail'
 *       400:
 *         $ref: '#/components/responses/400'
 *       5XX:
 *         $ref: '#/components/responses/5XX'
 */
productRouter.get('/:productId', loginRequired, productController.getDetail);

module.exports = productRouter;
