const userRouter = require('express').Router();
const { userController } = require('../controllers')

// userRouter.post('/signup', userController.signUp);
// userRouter.post('/signin', userController.signIn);
userRouter.get('/ping', userController.getPing);

module.exports = userRouter;