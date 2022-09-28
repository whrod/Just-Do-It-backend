const { cartDao } = require('../models');
const { checkStock } = require('../utils/checkStock');

const getCartsByUserId = async (userId) => {
  const cart = await cartDao.getCartsByUserId(userId);

  return await cart;
};

const getDetailInCart = async (cartId, userId) => {
  const getDescription = await cartDao.getDescription(cartId, userId);
  const getProductOptions = await cartDao.getProductOptions(cartId, userId);

  if (getDescription.productId === null) {
    const error = new Error('WROND_INPUT_REQUEST');
    error.statusCode = 400;

    throw error;
  }
  const result = [getDescription].concat(getProductOptions);
  return result;
};

const postCart = async (productOptionId, quantity, userId) => {
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
  getDetailInCart,
  postCart,
  updateCart,
  deleteCart,
  deleteAllCarts,
};
