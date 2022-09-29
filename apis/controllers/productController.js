const { productService } = require('../services');
const { catchAsync } = require('../utils/error');


const getDetail = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.userId;
  console.log(userId)

  const result = await productService.getDetail(productId, userId)
  return res.status(200).json(result)
})

module.exports = {
  getDetail
}