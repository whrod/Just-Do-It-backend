const { cartService } = require('../services');
const { catchAsync } = require('../utils/error');

const getCart = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await cartService.getCart(userId);

  res.status(200).send({ result });
});
// postCart;
// patchCart;
// deleteCart;

module.exports = {
  getCart,
};
