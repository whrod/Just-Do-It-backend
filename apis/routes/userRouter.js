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
 *             password:
 *               type: string
 *             fullName:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             address:
 *               type: string
 *             birth:
 *               type: string
 *               format: date
 *             gender:
 *               type: integer
 *     responses:
 *       200:
 *         description: Create a new user successfully
 */
userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);

module.exports = userRouter;
