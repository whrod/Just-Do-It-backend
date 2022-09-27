const { wishDao } = require('../models');

const createWish = async (productId, userId) => {
  console.log("service입니당")
  const checkWishlist = await wishDao.checkWishlist(productId, userId)
  if (checkWishlist) {
    const err = new Error(`ALREADY_EXIST`);
    err.statusCode = 400;
    throw err;
  }
  const createWish = await wishDao.createWish(productId, userId)
  const showWish = await wishDao.showWish(productId, userId)
  return createWish
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
