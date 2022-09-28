const wishRouter = require('express').Router();
const { wishController } = require('../controllers');

wishRouter.post('/create', wishController.createWish);

module.exports = wishRouter;