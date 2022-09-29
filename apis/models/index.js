const database = require('./dataSource');
const userDao = require('./userDao');
const cartDao = require('./cartDao');
const orderDao = require('./orderDao');
const productDao = require('./productDao');

module.exports = {
  userDao,
  productDao,
  cartDao,
  orderDao,
};
