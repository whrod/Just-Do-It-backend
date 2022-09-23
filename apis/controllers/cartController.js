const { cartService } = require('../services');
const { catchAsync } = require('../utils/error');

const getCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await cartService.getCart(userId);

  res.status(200).send({ result });
});

const postCart = catchAsync(async (req, res) => {
  const { productId, sizeId, userId, quantity } = req.body;

  await cartService.postCart(productId, sizeId, userId, quantity);

  res.status(200).send({ message: `${productId} was added at cart` });
});

const testCart = async (req, res) => {
  const { productId, sizeId, userId, quantity } = req.body;

  const result = await cartService.getProductOption(
    productId,
    sizeId,
    userId,
    quantity
  );

  res.status(200).send({ result });
};

module.exports = {
  getCart,
  postCart,
  testCart,
};
