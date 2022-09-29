const { cartDao } = require('../models');
const { checkStock } = require('../utils/checkStock');

const getCartsByUserId = async (userId) => {
  const cart = await cartDao.getCartsByUserId(userId);

  return await cart;
};

const postCart = async (productOptionId, quantity, userId) => {
  if (!productOptionId || !quantity) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  const checkIfTheCartExists = await cartDao.checkIfTheCartExists(
    productOptionId,
    userId
  );
  if (checkIfTheCartExists === undefined) {
    await checkStock(productOptionId, quantity);

    return await cartDao.postCart(productOptionId, userId, quantity);
  }
  if (checkIfTheCartExists.productOptionId === parseInt(productOptionId)) {
    await checkStock(productOptionId, quantity);

    return await cartDao.updateQuantityWhenPostCart(
      quantity,
      productOptionId,
      userId,
      checkIfTheCartExists.cartId
    );
  }
};

const updateCart = async (cartId, productOptionId, userId, quantity) => {
  if (!productOptionId || !quantity) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  await checkStock(productOptionId, quantity);

  return await cartDao.updateCart(productOptionId, userId, quantity, cartId);
};

const deleteCart = async (userId, cartId) => {
  await cartDao.deleteCart(userId, cartId);
};

const deleteAllCarts = async (userId) => {
  await cartDao.deleteAllCarts(userId);
};

module.exports = {
  getCartsByUserId,
  postCart,
  updateCart,
  deleteCart,
  deleteAllCarts,
};
