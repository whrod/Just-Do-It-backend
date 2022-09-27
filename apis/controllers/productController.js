const { productService } = require('../services');
const { catchAsync } = require('../utils/error');


const getDetail = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  if (req.isUser === true) {
    const userId = req.user.id
    const result = await productService.getDetail(productId, userId);
    return res.status(200).json(result)
  }
  if (!productId) {
    const err = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw err;
  }
  const result = await productService.getDetail(productId)
  return res.status(200).json(result)
})

module.exports = {
  getDetail
}