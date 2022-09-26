const { productService } = require('../services');
const { catchAsync } = require('../utils/error');


const getDetail = catchAsync(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    const err = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw err;
  }
  const result = await productService.getDetail(productId);
  return res.status(201).json(result)
})

module.exports = {
  getDetail
}