const userRouter = require('express').Router();
const { userController } = require('../controllers');

//TODO: 정규표현식 숨기기
/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create A New User
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
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
userRouter.post('/signup', userController.signUp);

/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Login
 *     description: Login & JWT token issue
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
 *               example: dockertest1
 *             password:
 *               type: string
 *               pattern: '^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$'
 *               example: qwe123qwe###
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *         description: Bad request.
 *       5XX:
 *         description: Unexpected error.
 */
userRouter.post('/signin', userController.signIn);

module.exports = userRouter;
