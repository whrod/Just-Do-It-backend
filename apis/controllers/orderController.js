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

const orderInCart = async (req, res) => {
  const userId = req.user.id;
  const { cartId } = req.body;

  //db의 카트ids와 프론트에서 전달해준 cartid가 같은지 에러핸들링
  const result = await orderService.checkProduct(userId);

  res.status(200).send(result);
};

module.exports = {
  orderImmediately,
  orderInCart,
};
