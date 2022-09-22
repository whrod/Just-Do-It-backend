const router = require('express').Router();

const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');

router.use('/users', userRouter);
router.use('/cart', cartRouter);

module.exports = router;
