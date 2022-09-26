const router = require('express').Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

router.use('/products', productRouter);
router.use('/users', userRouter);

module.exports = router;
