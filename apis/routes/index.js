const router = require('express').Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const wishRouter = require('./wishRouter');

router.use('/users', userRouter);
router.use('/product', productRouter);
router.use('/wishlist', wishRouter);

module.exports = router;
