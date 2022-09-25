const { orderDao } = require('../models');
const { checkStock } = require('../utils/checkStock');

const orderImmediately = async (productOptionId, quantity) => {
  await checkStock(productOptionId, quantity);

  await orderDao.orderImmediately(productOptionId, quantity);
};

module.exports = {
  orderImmediately,
};
