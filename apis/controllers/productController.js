const { productService } = require('../services');

const getProducts = async (req, res) => {
  const { sort, limit, offset } = req.query;
  let { size, color, brand } = req.query;

  if (!limit || !offset) {
    const err = new Error('QUERYSTRING_OMITTED');
    err.statusCode = 400;

    throw err;
  }

  if (typeof size === 'string') {
    size = [size];
  }
  if (typeof color === 'string ') {
    color = [color];
  }
  if (typeof brand === 'string ') {
    brand = [brand];
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
};

module.exports = {
  getProducts,
};
