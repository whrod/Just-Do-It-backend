const { wishService } = require('../services');
const { catchAsync } = require('../utils/error');

const createWish = catchAsync(async (req, res) => {
  const { productId, userName } = req.params;
  if (!productId || !userName) {
    const err = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw err;
  }
  const result = await wishService.createWish(productId, userName)
  return res.status(201).json(result)


})
module.exports = {
  createWish
}