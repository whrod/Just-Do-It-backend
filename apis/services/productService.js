const { productDao } = require('../models');

const getProducts = async (sort, color, brand, size, limit, offset) => {
  return await productDao.getProducts(sort, color, brand, size, limit, offset);
};

module.exports = {
  getProducts,
};
/products/;
