const productRouter = require('express').Router();
const { productController } = require('../controllers');
const { checkUserId, loginRequired } = require('../utils/auth');

//TODO: Enum, Array component, description 수정
/**
 * @swagger
 * /product:
 *   get:
 *     summary: Filter & Sort Products
 *     description: Filter and sorting in the entire product list
 *     tags:
 *       - Product
 *     parameters:
 *       - name: offset
 *         in: query
 *         required: true
 *         type: integer
 *         default: 0
 *         minimum: 0
 *       - name: limit
 *         in: query
 *         required: true
 *         type: integer
 *         default: 20
 *         minimum: 1
 *         maximum: 20
 *       - name: sort
 *         in: query
 *         required : false
 *         schema:
 *           type: string
 *           enum: [discountRate desc, price asc, price desc, releaseDate desc]
 *           default: releaseDate desc
 *       - name: size
 *         in: query
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         collectionFormat: multi
 *         value:
 *         - 220
 *         - 225
 *         - 230
 *         - 240
 *         - 245
 *         - 250
 *         - 255
 *         - 260
 *         - 265
 *         - 270
 *         - 275
 *         - 280
 *         - 285
 *         - 290
 *         - 295
 *         - 300
 *         - 305
 *         - 310
 *       - name: color
 *         in: query
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         collectionFormat: multi
 *         value:
 *         - 1
 *         - 2
 *         - 3
 *         - 4
 *         - 5
 *         - 6
 *         - 7
 *         - 8
 *         - 9
 *         - 10
 *         - 11
 *         - 12
 *       - name: brand
 *         in: query
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         collectionFormat: multi
 *         value:
 *           - 1
 *           - 2
 *           - 3
 *     responses:
 *       200:
 *         description: Product list page loaded successfully.
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
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
 *       - name: productId
 *         in: path
 *         required: true
 *         type: integer
 *         minimum: 1
 *         maximum: 19
 *     responses:
 *       200:
 *         description: Successfully load product detail page.
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
productRouter.get('/:productId', loginRequired, productController.getDetail);

module.exports = productRouter;
