const { cartDao } = require('../models');

const getCart = async (userId) => {
  const result = cartDao.getCartById(userId);
  return await result;
};

const getProductOption = async (productId, sizeId) => {
  const productOption = await cartDao.getProductOption(productId, sizeId);

  return productOption;
};

const postCart = async (productOptionId, quantity, userId) => {
  const productOption = await getProductOption(productOptionId);

  if (productOption.stock === 0) {
    const error = new Error('OUT_OF_STOCK');
    error.statusCode = 400;

    throw error;
  }
  if (productOption.stock < quantity) {
    const error = new Error('CART_QUANTITY_MORE_THAN_STOCK');
    error.statusCode = 400;

    throw error;
  }
  return await cartDao.postCart(productOptionId, userId, quantity);
};

module.exports = {
  getCart,
  getProductOption,
  postCart,
};
