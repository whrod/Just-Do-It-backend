const { orderDao } = require('../models');
const { checkStock } = require('../utils/checkStock');

const orderImmediately = async (productOptionId, quantity) => {
  await checkStock(productOptionId, quantity);

  await orderDao.orderImmediately(productOptionId, quantity);
};

const orderInCart = async (userId) => {
  const checkCartForOrder = await orderDao.checkCartForOrder(userId);

  const productOptionsForOrder = new Array();
  const quantityForOrder = new Array();

  for (let i = 0; i < checkCartForOrder.length; i++) {
    productOptionsForOrder.push(checkCartForOrder[i].productOptionId);
    quantityForOrder.push(checkCartForOrder[i].quantity);
  }

  console.log(productOptionsForOrder);
  console.log(quantityForOrder);

  await orderDao.orderInCart(productOptionsForOrder, quantityForOrder);
};

module.exports = {
  orderImmediately,
  orderInCart,
};
