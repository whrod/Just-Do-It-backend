const userRouter = require('express').Router();
const { userController } = require('../controllers');

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create A New User
 *     description: Member registration process
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref : '#components/requestBodies/SignUp'
 *     responses:
 *       201:
 *         description: Create a new user successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpResult'
 *       400:
 *         $ref: '#components/responses/400'
 *       5XX:
 *         $ref: '#components/responses/5XX'
 */
userRouter.post('/signup', userController.signUp);

/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: Login
 *     description: Login & JWT token issue
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref : '#/components/requestBodies/SignIn'
 *     responses:
 *       201:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignInResult'
 *       400:
 *         $ref: '#components/responses/400'
 *       5XX:
 *         $ref: '#components/responses/5XX'
 */
userRouter.post('/signin', userController.signIn);

module.exports = userRouter;
