const { orderDao } = require('../models');
const { checkStock } = require('../utils/checkStock');

const orderImmediately = async (productOptionId, quantity) => {
  await checkStock(productOptionId, quantity);

  await orderDao.orderImmediately(productOptionId, quantity);
};

const checkProduct = async (userId) => {
  const checkedCart = await orderDao.checkProduct(userId.productOptions);
  const productOptions = new Array();
  for (let i = 0; i < checkedCart.length; i++) {
    productOptions.push(checkedCart[i].productOptionId);
  }
  console.log(productOptions);
  const orderInCart = await orderDao.orderInCart(productOptions);
};

module.exports = {
  orderImmediately,
  checkProduct,
};
