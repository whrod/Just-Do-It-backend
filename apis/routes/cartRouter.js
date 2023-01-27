const cartRouter = require('express').Router();
const { cartController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

//TODO: 컴포넌트 사용, 모듈화

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartExample'
 *       400:
 *         $ref: '#/components/responses/400'
 *       5XX:
 *         $ref: '#/components/responses/5XX'
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
 *       - $ref : '#/components/parameters/cartId'
 *     responses:
 *       200:
 *         description: Successfully load one cart about detail page.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OneCartDetailForChangingOption'
 *       400:
 *         $ref: '#/components/responses/400'
 *       5XX:
 *         $ref: '#/components/responses/5XX'
 */
cartRouter.get('/:cartId', loginRequired, cartController.getDetailInCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add Product To Cart
 *     description: Create cart with productOptionId and quantity<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref : '#components/requestBodies/ProductOptionsAndQuantity'
 *     responses:
 *       201:
 *         description: Successfully added an item to your shopping cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartOrProductStatusChange'
 *       400:
 *         $ref: '#components/responses/400'
 *       5XX:
 *         $ref: '#components/responses/5XX'
 */
cartRouter.post('/', loginRequired, cartController.postCart);

/**
 * @swagger
 * /cart/{cartId}:
 *   patch:
 *     summary: Change the product options in your cart
 *     description: Change cart with productOptionId and quantity<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref : '#/components/parameters/cartId'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref : '#components/requestBodies/ProductOptionsAndQuantity'
 *     responses:
 *       201:
 *         description: Successfully change cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartOrProductStatusChange'
 *       400:
 *         $ref: '#components/responses/400'
 *       5XX:
 *         $ref: '#components/responses/5XX'
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
 *       - $ref : '#/components/parameters/cartId'
 *     responses:
 *       201:
 *         description: Successfully delete a item in cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartOrProductStatusChange'
 *       400:
 *         $ref: '#components/responses/400'
 *       5XX:
 *         $ref: '#components/responses/5XX'
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
 *       201:
 *         description: Successfully delete all cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartClearedResult'
 *       400:
 *         $ref: '#components/responses/400'
 *       5XX:
 *         $ref: '#components/responses/5XX'
 */
cartRouter.delete('/', loginRequired, cartController.deleteAllCarts);

module.exports = cartRouter;
