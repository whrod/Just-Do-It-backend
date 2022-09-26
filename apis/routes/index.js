const router = require('express').Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

router.use('/users', userRouter);
router.use('/product', productRouter);

module.exports = router;
