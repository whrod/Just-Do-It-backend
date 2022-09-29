const database = require('./dataSource');
const userDao = require('./userDao');
const wishDao = require('./wishDao');
const cartDao = require('./cartDao');
const orderDao = require('./orderDao');
const productDao = require('./productDao');


module.exports = {
  userDao,
  productDao,
  wishDao,
  cartDao,
  orderDao,
};

