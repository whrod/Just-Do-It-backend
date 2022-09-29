const { productService } = require('../services');
const { catchAsync } = require('../utils/error');


const getDetail = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { user } = req.user;
  const userId = user.id;
  const result = await productService.getDetail(productId, userId)
  return res.status(200).json(result)
})

module.exports = {
  getDetail
}