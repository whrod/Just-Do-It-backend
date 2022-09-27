const { cartService } = require('../services');
const { catchAsync } = require('../utils/error');

const getCarts = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await cartService.getCartsByUserId(userId);

  res.status(200).send({ result });
});

const getDetailInCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productId = req.query.productId;

  const result = await cartService.getDetailInCart(userId, productId);

  res.status(200).send(result);
});

const postCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productOptionId, quantity } = req.body;

  await cartService.postCart(productOptionId, quantity, userId);

  res.status(201).send({
    message: `Cart was created`,
    userId: userId,
    productOptionId: productOptionId,
  });
});

const updateCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.cartId;
  const { productOptionId, quantity } = req.body;

  await cartService.updateCart(cartId, productOptionId, userId, quantity);

  res
    .status(200)
    .send({ message: `Cart was updated`, userId: userId, cartId: cartId });
});

const deleteCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.cartId;

  await cartService.deleteCart(userId, cartId);

  res
    .status(200)
    .send({ message: `Cart was deleted`, userId: userId, cartId: cartId });
});

const deleteAllCarts = async (req, res) => {
  const userId = req.user.id;

  await cartService.deleteAllCarts(userId);

  res.status(200).send({
    message: `All carts were deleted`,
    userId: userId,
  });
};

module.exports = {
  getCarts,
  getDetailInCart,
  postCart,
  updateCart,
  deleteCart,
  deleteAllCarts,
};
