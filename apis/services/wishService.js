const { wishDao } = require('../models');

const createWish = async (productId, userId) => {
  const [checkWishlist] = await wishDao.checkWishlist(productId, userId)
  if (checkWishlist) {
    const err = new Error(`ALREADY_EXIST`);
    err.statusCode = 400;
    throw err;
  }
  await wishDao.createWish(productId, userId)
  const getWishList = await wishDao.getWishList(userId)
  return getWishList
}

const removeWish = async (productId, userId) => {
  const [checkWishlist] = await wishDao.checkWishlist(productId, userId)
  if (!checkWishlist) {
    const err = new Error(`NOT_EXIST_IN_WISHLIST`);
    err.statusCode = 400;
    throw err;
  }
  await wishDao.removeWish(productId)
  const getWishList = await wishDao.getWishList(userId)
  if (!getWishList[0]) {
    return (`WISHLIST_IS_EMPTY`)
  }
  return getWishList
}

const getWishList = async (userId) => {
  const getWishList = await wishDao.getWishList(userId)
  if (!getWishList[0]) {
    return (`WISHLIST_IS_EMPTY`)
  }
  return getWishList
}


module.exports = {
  createWish,
  removeWish,
  getWishList
}
