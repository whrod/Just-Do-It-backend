const { wishDao } = require('../models');

const createWish = async (productId, userName) => {
  const checkWishlist = await wishDao.checkWishlist(productId, userName)
  if (checkWishlist) {
    const err = new Error(`ALREADY_EXIST`);
    err.statusCode = 400;
    throw err;
  }
  const getProductInfo = await wishDao.createWish(productId, userName)
  return getProductInfo
}

const removeWish = async (productId) => {
  const checkWishlist = await wishDao.checkWishlist(productId, userName)
  if (!checkWishlist) {
    const err = new Error(`NOT_EXIST_IN_WISHLIST`);
    err.statusCode = 400;
    throw err;
  }

  const removeWish = await wishDao.removeWish(productId, userName)
  return removeWish
}


module.exports = {
  createWish,
  removeWish
}
