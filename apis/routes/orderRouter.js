const orderRouter = require('express').Router();
const { orderController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

/**
 * @swagger
 * /order:
 *   patch:
 *     summary: Order a specific product from the detail page
 *     description: Order one item with productOptionId and quantity<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productOptionId
 *               - quantity
 *             properties:
 *               productOptionId:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 456
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 default: 1
 *     responses:
 *       201:
 *         description: Successfully ordered an item.
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
orderRouter.patch('/', loginRequired, orderController.orderInDetail);

/**
 * @swagger
 * /order/cart:
 *   patch:
 *     summary: Order all items in your cart
 *     description: Order all products in the cart of the logged-in user<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Successfully ordered all items in cart.
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
orderRouter.patch('/cart', loginRequired, orderController.orderInCart);

module.exports = orderRouter;
