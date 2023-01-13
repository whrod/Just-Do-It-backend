const cartRouter = require('express').Router();
const { cartController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get Logged-in User's Cart Page
 *     description: Logged-in user's cart information<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully load cart page.
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
cartRouter.get('/', loginRequired, cartController.getCarts);

/**
 * @swagger
 * /cart/{cartId}:
 *   get:
 *     summary: Get One Cart Detail for Changing Option
 *     description: Shopping cart detail page and its product information for changing shopping cart options<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully load cart page.
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
cartRouter.get('/:cartId', loginRequired, cartController.getDetailInCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add product to cart
 *     description: Create cart with product option ID and quantity<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Cart
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
 *                 maximum: 196
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 default: 1
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
cartRouter.post('/', loginRequired, cartController.postCart);

/**
 * @swagger
 * /cart/{cartId}:
 *   patch:
 *     summary: Change the product options in your cart
 *     description: Change cart with product option ID and quantity<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         type: integer
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
 *                 maximum: 196
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 default: 1
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
cartRouter.patch('/:cartId', loginRequired, cartController.updateCart);

/**
 * @swagger
 * /cart/{cartId}:
 *   delete:
 *     summary: Delete Cart
 *     description: Delete one item in a specific shopping cart (product)<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cartId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully load cart page.
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
cartRouter.delete('/:cartId', loginRequired, cartController.deleteCart);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Delete All Carts Of logged-in users
 *     description: Delete all items in cart<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully load cart page.
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
cartRouter.delete('/', loginRequired, cartController.deleteAllCarts);

module.exports = cartRouter;
