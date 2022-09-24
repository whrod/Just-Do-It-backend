const { cartDao } = require('../models');

const getCart = async (userId) => {
  const result = cartDao.getCartById(userId);
  return await result;
};

const postCart = async (productOptionId, quantity, userId) => {
  const productOption = await cartDao.getProductOption(productOptionId);

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

const updateCart = async (cartId, productId, sizeId, userId, quantity) => {
  const productOption = await cartDao.getProductOptionBySelect(
    productId,
    sizeId
  );

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

  return await cartDao.updateCart(productOption.id, userId, quantity, cartId);
};

//해당 유저의 카트가 맞는지 확인
// const checkCartUser = await cartDao.checkCartUser(userId);

// if (checkCartUser.id === userId) {
//   const error = new Error('WRONG CART');
//   error.statusCode = 400;

//   throw error;
// }

module.exports = {
  getCart,
  postCart,
  updateCart,
};
