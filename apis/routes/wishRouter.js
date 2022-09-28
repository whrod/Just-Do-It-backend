const wishRouter = require('express').Router();
const { wishController } = require('../controllers');
const { loginRequired } = require("../utils/auth");

wishRouter.post('/create/:productId', loginRequired, wishController.createWish);
wishRouter.get('/', loginRequired, wishController.postWish)
wishRouter.delete('/remove', loginRequired, wishController.removeWish);

module.exports = wishRouter;