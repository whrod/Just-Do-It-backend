const router = require('express').Router();
const { wishController } = require('../controllers');
const { loginRequired } = require("../utils/auth");

router.post('/:productId', loginRequired, wishController.createWish);
router.get('', loginRequired, wishController.postWish)
router.delete('/:productId', loginRequired, wishController.removeWish);

module.exports = router;