const { cartService } = require('../services');
const { catchAsync } = require('../utils/error');

const getCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await cartService.getCart(userId);

  res.status(200).send({ result });
});

const postCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productId, sizeId, quantity } = req.body;

  await cartService.postCart(productId, sizeId, userId, quantity);

  res
    .status(200)
    .send({ message: `Product ${productId} was added to ${userId}'s cart` });
});

module.exports = {
  getCart,
  postCart,
};
