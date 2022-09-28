const { orderDao, cartDao } = require('../models');
const { checkStock } = require('../utils/checkStock');
const { getCartsByUserId } = require('../models/cartDao');

const orderInDetail = async (productOptionId, quantity) => {
  await checkStock(productOptionId, quantity);

  await orderDao.orderInDetail(productOptionId, quantity);
};

//재고 관리 필요
const orderInCart = async (userId) => {
  const getCartsforOrder = await cartDao.getCartsByUserId(userId);
  console.log(getCartsforOrder);
  return await orderDao.orderInCart(userId);
};

module.exports = {
  orderInDetail,
  orderInCart,
};
