const { orderDao } = require('../models');
const { checkStock } = require('../utils/checkStock');

const orderImmediately = async (productOptionId, quantity) => {
  await checkStock(productOptionId, quantity);

  await orderDao.orderImmediately(productOptionId, quantity);
};

const checkProduct = async (userId) => {
  const result = await orderDao.checkProduct(userId);

  const a = new Array();
  for (let i = 0; i < result.length; i++) {
    a.push(result[i].productOptionId);
  }
  console.log(a);
  console.log(result);
  return result;
};

module.exports = {
  orderImmediately,
  checkProduct,
};
