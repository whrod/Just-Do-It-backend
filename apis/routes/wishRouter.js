const router = require('express').Router();
const { wishController } = require('../controllers');
const { loginRequired } = require("../utils/auth");

router.post('', loginRequired, wishController.createWish);
router.get('', loginRequired, wishController.getWishList)
router.delete('/:productId', loginRequired, wishController.removeWish);

module.exports = router;