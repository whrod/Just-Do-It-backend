const { cartService } = require('../services');
const { catchAsync } = require('../utils/error');

const getCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await cartService.getCartByUserId(userId);

  res.status(200).send({ result });
});

const postCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId, productOptionId, quantity } = req.body;

  await cartService.postCart(productOptionId, quantity, userId);

  res.status(201).send({
    message: `Cart was created`,
    productId: productId,
    userId: userId,
  });
});

const updateCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { cartId, productId, sizeId, quantity } = req.body;

  await cartService.updateCart(cartId, productId, sizeId, userId, quantity);

  res.status(204).send({ message: `Cart was updated`, userId: userId });
});

const deleteCart = catchAsync(async (req, res) => {
  const cartId = req.params.cartId;

  await cartService.deleteCart(cartId);

  res.status(204).send({ message: `Cart was deleted`, cartId: cartId });
});

module.exports = {
  getCart,
  postCart,
  updateCart,
  deleteCart,
};
