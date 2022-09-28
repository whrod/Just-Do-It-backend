const { orderDao, cartDao } = require('../models');
const { checkStock } = require('../utils/checkStock');

const orderInDetail = async (productOptionId, quantity) => {
  await checkStock(productOptionId, quantity);

  await orderDao.orderInDetail(productOptionId, quantity);
};

//result.affectRows와 getCartForOrder가 다를 경우 에러 핸들링
// const orderInCart = async (userId) => {
//   const getCartsForOrder = await cartDao.getCartsByUserId(userId);
//   for (let i = 0; i < getCartsForOrder.length; i++) {
//     if (getCartsForOrder[i].stock >= getCartsForOrder[i].quantity) {
//       const result = await orderDao.orderInCart(userId);
//       await cartDao.deleteAllCarts(userId);
//       return result;
//     }
//     if (getCartsForOrder[i].stock === 0) {
//       const error = new Error('ITEMS_IN_YOUR_CART_ARE_OUT_OF_STOCK');
//       error.statusCode = 400;
//       throw error;
//     }
//   }
// };

const orderInCart = async (userId) => {
  return await orderDao.orderInCart(userId);
};
module.exports = {
  orderInDetail,
  orderInCart,
};
