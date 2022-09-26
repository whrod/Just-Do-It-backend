1 const wishRouter = require('express').Router();
const { wishController } = require('../controllers');

wishRouter.get('/create', wishController.createWish);

module.exports = wishRouter;