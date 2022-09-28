const { wishDao } = require('../models');

const createWish = async (productId, userId) => {
  const [checkWishlist] = await wishDao.checkWishlist(productId, userId)
  console.log(checkWishlist)
  console.log([checkWishlist])
  if (checkWishlist) {
    const err = new Error(`ALREADY_EXIST`);
    err.statusCode = 400;
    throw err;
  }
  await wishDao.createWish(productId, userId)
  const showWish = await wishDao.showWish(userId)
  return showWish
}

const removeWish = async (productId, userId) => {
  const [checkWishlist] = await wishDao.checkWishlist(productId, userId)
  if (!checkWishlist) {
    const err = new Error(`NOT_EXIST_IN_WISHLIST`);
    err.statusCode = 400;
    throw err;
  }
  await wishDao.removeWish(productId)
  const showWish = await wishDao.showWish(userId)
  if (!showWish[0]) {
    return (`WISHLIST_IS_EMPTY`)
  }
  return showWish
}

const postWish = async (userId) => {
  const showWish = await wishDao.showWish(userId)
  if (!showWish[0]) {
    return (`WISHLIST_IS_EMPTY`)
  }
  return showWish
}


module.exports = {
  createWish,
  removeWish,
  postWish
}
