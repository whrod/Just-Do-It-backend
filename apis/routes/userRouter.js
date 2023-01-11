const userRouter = require('express').Router();
const { userController } = require('../controllers');

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - userName
 *             - password
 *             - fullName
 *             - phoneNumber
 *             - address
 *             - birth
 *             - gender
 *           properties:
 *             userName:
 *               type: string
 *               pattern: '[a-zA-Z0-9_-]$'
 *               minLength: 6
 *               maxLength: 99
 *             password:
 *               type: string
 *               pattern: '^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$'
 *             fullName:
 *               type: string
 *             phoneNumber:
 *               type: string
 *               pattern: '^[0-9]{2,3}[0-9]{3,4}[0-9]{4}'
 *             address:
 *               type: string
 *             birth:
 *               type: string
 *               format: date
 *             gender:
 *               type: integer
 *               minimum: 0
 *               maximum: 1
 *     responses:
 *       201:
 *         description: Create a new user successfully
 */
userRouter.post('/signup', userController.signUp);

/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Login & Authorization
 *     description: Login
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - userName
 *             - password
 *           properties:
 *             userName:
 *               type: string
 *               pattern: '[a-zA-Z0-9_-]$'
 *               minLength: 6
 *               maxLength: 99
 *             password:
 *               type: string
 *               pattern: '^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$'
 *     responses:
 *       201:
 *         description: Login Success
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * security:
 * - bearerAuth: []
 */
userRouter.post('/signin', userController.signIn);

module.exports = userRouter;
