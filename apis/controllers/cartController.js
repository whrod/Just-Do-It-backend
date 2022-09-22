const { cartService } = require('../services');

const getCart = async (req, res) => {
  // const userId = req.user.id;
  const { userId } = req.params;
  const result = await cartService.getCart(userId);

  res.status(200).send({ result });
};
// postCart;
// patchCart;
// deleteCart;

module.exports = {
  getCart,
};
