const router = require('express').Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/carts', cartRouter);

module.exports = router;
