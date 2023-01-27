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
 *       content:
 *         application/json:
 *           schema:
 *             $ref : '#components/requestBodies/ProductOptionsAndQuantity'
 *     responses:
 *       201:
 *         description: Successfully ordered an item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartOrProductStatusChange'
 *       400:
 *         $ref: '#components/responses/400'
 *       5XX:
 *         $ref: '#components/responses/5XX'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderCartsResult'
 *       400:
 *         $ref: '#components/responses/400'
 *       5XX:
 *         $ref: '#components/responses/5XX'
 */
orderRouter.patch('/cart', loginRequired, orderController.orderInCart);

module.exports = orderRouter;
