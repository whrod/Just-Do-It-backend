const { cartDao } = require('../models');
const { checkStock } = require('../utils/checkStock');

const getCartByUserId = async (userId) => {
  const cart = await cartDao.getCartByUserId(userId);

  // const a = [];
  // for (let i = 0; i < cart.length; i++) a.push(cart[i].productId);
  // // console.log(a);
  // const getDetailInCart = await cartDao.getDetailInCart(a);

  return await [cart];
};

const postCart = async (productOptionId, quantity, userId) => {
  const checkIfTheCartExists = await cartDao.checkIfTheCartExists(
    productOptionId,
    userId
  );
  if (checkIfTheCartExists === undefined) {
    await checkStock(productOptionId, quantity);

    return await cartDao.postCart(productOptionId, userId, quantity);
  } else if (
    checkIfTheCartExists.productOptionId === parseInt(productOptionId)
  ) {
    await checkStock(productOptionId, quantity);

    return await cartDao.updateQuantityWhenPostCart(
      quantity,
      productOptionId,
      userId,
      checkIfTheCartExists.cartId
    );
  }
};

const updateCart = async (cartId, productId, sizeId, userId, quantity) => {
  const productOption = await cartDao.getProductOptionBySelect(
    productId,
    sizeId
  );

  await checkStock(productOption.id, quantity);

  return await cartDao.updateCart(productOption.id, userId, quantity, cartId);
};

const deleteCart = async (cartId) => {
  await cartDao.deleteCart(cartId);
};

module.exports = {
  getCartByUserId,
  postCart,
  updateCart,
  deleteCart,
};
