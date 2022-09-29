const router = require('express').Router();
const { wishController } = require('../controllers');
const { loginRequired } = require("../utils/auth");

router.post('', loginRequired, wishController.createWish); //바디로받음
router.get('', loginRequired, wishController.postWish)
router.delete('', loginRequired, wishController.removeWish); //쿼리파라미터로 받음

module.exports = router;