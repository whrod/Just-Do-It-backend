const { wishService } = require('../services');
const { catchAsync } = require('../utils/error');


const createWish = catchAsync(async (req, res) => {
  const userId = req.user.id
  const { productId } = req.body;

  if (!productId) {
    const err = new Error('KEY_ERROR');
    err.statusCode = 400;
    throw err;
  }

  await wishService.createWish(productId, userId)
  return res.status(201).json({ message: "WISH_CREATE_SUCCESS" })
})

const getWishList = catchAsync(async (req, res) => {
  const userId = req.user.id
  const result = await wishService.getWishList(userId)
  return res.status(200).json(result)
})

const removeWish = catchAsync(async (req, res) => {
  const userId = req.user.id
  const { productId } = req.query;

  const result = await wishService.removeWish(productId, userId)
  return res.status(200).json(result)
})



module.exports = {
  createWish,
  getWishList,
  removeWish
}