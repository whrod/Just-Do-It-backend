const database = require('./dataSource');
const userDao = require('./userDao');
const cartDao = require('./cartDao');
const productDao = require('./productDao');

module.exports = {
  userDao,
  productDao,
  cartDao,
  orderDao,
};
