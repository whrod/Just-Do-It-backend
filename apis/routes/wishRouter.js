const wishRouter = require('express').Router();
const { wishController } = require('../controllers');
const { loginRequired } = require("../utils/auth");

// wishRouter.get('/create', loginRequired, wishController.createWish);
// wishRouter.delete('/remove', loginRequired, wishController.removeWish);

wishRouter.get('/create', wishController.createWish);
wishRouter.delete('/remove', wishController.removeWish);

module.exports = wishRouter;