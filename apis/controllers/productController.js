const { productService } = require('../services');

const getProducts = async (req, res) => {
  const { sort, color, brand, size, limit, offset } = req.query;
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
    parseInt(parseInt(limit)),
    parseInt(parseInt(offset))
  );
  res.status(200).send({ list: products });
};

module.exports = {
  getProducts,
};
