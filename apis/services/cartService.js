const { cartDao } = require('../models');

const getCart = async (userId) => {
  const result = cartDao.getCartById(userId);
  return await result;
};

//product_id, size_id로 product_options 뽑기 => stock 체크
const getProductOption = async (productId, sizeId) => {
  const result = await cartDao.getProductOption(productId, sizeId);
  // console.log(result);
  return result;
};

const postCart = async (productId, sizeId, userId, quantity) => {
  const productOption = await getProductOption(productId, sizeId);
  // console.dir(productOption, { depth: null });
  if (productOption.stock < quantity) {
    const error = new Error('OUT_OF_STOCK');
    error.statusCode = 400;

    throw error;
  }
  return (result = await cartDao.postCart(productOption.id, userId, quantity));
};

// const checkStock = async(productId);

// const postCart = async (sizeId, proudctId, userId) => {};

module.exports = {
  getCart,
  getProductOption,
  postCart,
};
