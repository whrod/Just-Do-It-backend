const { orderDao, cartDao } = require('../models');
const { checkStock } = require('../utils/checkStock');

const orderInDetail = async (productOptionId, quantity) => {
  await checkStock(productOptionId, quantity);

  await orderDao.orderInDetail(productOptionId, quantity);
};

const orderInCart = async (userId) => {
  const getCartsforOrder = await cartDao.getCartsByUserId(userId);
  for (let i = 0; i < getCartsforOrder.length; i++) {
    console.log(getCartsforOrder[i].stock);
    console.log(getCartsforOrder[i].quantity);

    if (getCartsforOrder[i].stock >= getCartsforOrder[i].quantity) {
      const result = await orderDao.orderInCart(userId);
      await cartDao.deleteAllCarts(userId);
      return result;
    }
    if (getCartsforOrder[i].stock !== getCartsforOrder[i].quantity) {
      const error = new Error(`INVALID QUANTITY OF REQUEST`);
      error.statusCode = 400;
      throw error;
    }
    if (getCartsforOrder[i].stock === 0) {
      const error = new Error('ITEMS_IN_YOUR_CART_ARE_OUT_OF_STOCK');
      error.statusCode = 400;
      throw error;
    }
  }
};

module.exports = {
  orderInDetail,
  orderInCart,
};
