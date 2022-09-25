const { orderService } = require('../services');
const { catchAsync } = require('../utils/error');

const orderImmediately = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { productOptionId, quantity } = req.body;
  await orderService.orderImmediately(productOptionId, quantity);

  res.status(201).send({
    message: `User ${userId} purchased ${quantity} item(s) ${productOptionId}`,
  });
});

module.exports = {
  orderImmediately,
};
