const { cartDao } = require('../models');
const { checkIfTheCartExists } = require('../models/cartDao');
const { checkStock } = require('../utils/checkStock');

const getCartsByUserId = async (userId) => {
  const cart = await cartDao.getCartsByUserId(userId);

  return await cart;
};

const getDetailInCart = async (userId, productId) => {
  const checkProductInCart = await cartDao.checkProductInCart(userId);
  if (checkProductInCart.productId !== parseInt(productId)) {
    const error = new Error('WRONG_INPUT_REQUEST');
    error.statusCode = 400;

    throw error;
  }

  const images = await cartDao.getProductImages(productId);
  const getProductOptions = await cartDao.getProductOptions(productId);
  const [getDescrption] = await cartDao.getDescription(productId);

  getDescrption.images = images;
  getDescrption.productOptions = getProductOptions;

  return getDescrption;
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
