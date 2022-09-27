const { orderDao } = require('../models');
const { checkStock } = require('../utils/checkStock');

const orderInDetail = async (productOptionId, quantity) => {
  await checkStock(productOptionId, quantity);

  await orderDao.orderInDetail(productOptionId, quantity);
};

const orderInCart = async (userId) => {
  return await orderDao.orderInCart(userId);
};

module.exports = {
  orderInDetail,
  orderInCart,
};
