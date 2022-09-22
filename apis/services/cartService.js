const { cartDao } = require('../models');

const getCart = async (userId) => {
  const result = cartDao.getCartById(userId);
  return await result;
};

module.exports = {
  getCart,
};
