const database = require('../models/dataSource');
const queryRunner = database.createQueryRunner();
const { orderDao } = require('../models');
const { checkStock } = require('../utils/checkStock');

const orderInDetail = async (quantity, userId, productOptionId) => {
  await queryRunner.connect();
  await queryRunner.startTransaction();

  await checkStock(productOptionId, quantity);

  try {
    await orderDao.orderInDetail(productOptionId, quantity);
    await orderDao.deleteCart(userId, productOptionId);
  } catch (error) {
    await queryRunner.rollbackTransaction();
  }
};

const orderInCart = async (userId) => {
  try {
    const checkCart = await orderDao.checkCartForOrder(userId);

    let isTrue = 0;
    for (let i = 0; i < checkCart.length; i++) {
      if (checkCart[i].stock >= checkCart[i].quantity) {
        isTrue = true;
      }
    }
    if ((isTrue = true)) {
      const result = await orderDao.orderInCart(userId);
      await orderDao.deleteAllCarts(userId);
      await queryRunner.commitTransaction();
      return result;
    }
  } catch (error) {
    await queryRunner.rollbackTransaction();
  }
};

module.exports = {
  orderInDetail,
  orderInCart,
};
