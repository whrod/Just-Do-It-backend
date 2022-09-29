const router = require('express').Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');

router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/orders', orderRouter);

module.exports = router;
