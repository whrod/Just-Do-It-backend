const router = require('express').Router();
const { wishController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add product to wishlist
 *     description: Logged-in user adds the product to the wish list with the productId
 *                  Please authorize for API testing
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 19
 *                 default: 1
 *     responses:
 *       201:
 *         description:  Successfully added an item to your wishlist.
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
router.post('', loginRequired, wishController.createWish);

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get Logged-in User's Wishlist Page
 *     description: Logged-in user's wishlist information<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully load wishlist page.
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
router.get('', loginRequired, wishController.getWishList);

/**
 * @swagger
 * /wishlist/{productId}:
 *   delete:
 *     summary: Delete Wishlist
 *     description: Delete one item in wishList<br>
 *                  Please authorize for API testing
 *     tags:
 *       - Wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully delete cart items
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
router.delete('/:productId', loginRequired, wishController.removeWish);

module.exports = router;
