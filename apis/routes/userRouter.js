const userRouter = require('express').Router();
const { userController } = require('../controllers')

userRouter.post('/signin', userController.signIn)

module.exports = userRouter;