const router = require('express').Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const wishRouter = require('./wishRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');

router.use('/product', productRouter);
router.use('/wishlist', wishRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);

module.exports = router;
