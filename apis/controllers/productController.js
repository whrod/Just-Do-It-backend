const { productService } = require('../services');
const { catchAsync } = require('../utils/error');


const getDetail = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.userId;


  const result = await productService.getDetail(productId, userId)
  return res.status(200).json(result)
})


const getProducts = catchAsync(async (req, res) => {
  const { sort, size, color, brand, limit, offset } = req.query;

  if (!limit || !offset) {
    const err = new Error('QUERYSTRING_OMITTED');
    err.statusCode = 400;

    throw err;
  }

  const products = await productService.getProducts(
    sort,
    color,
    brand,
    size,
    parseInt(limit),
    parseInt(offset)
  );
  res.status(200).send({ list: products });
});


module.exports = {
  getProducts,
  getDetail
};

