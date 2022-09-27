const { orderService } = require('../services');
const { catchAsync } = require('../utils/error');

const orderInDetail = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productOptionId, quantity } = req.body;
  await orderService.orderInDetail(productOptionId, quantity);

  res.status(201).send({
    message: `One order was created`,
    userId: userId,
    productOptionId: productOptionId,
  });
});

const orderInCart = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await orderService.orderInCart(userId);

  res.status(200).send({
    message: `All cart orders were placed.`,
    userId: userId,
    numberOfOrder: result,
  });
});

module.exports = {
  orderInDetail,
  orderInCart,
};
