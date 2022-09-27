const { wishService, userService } = require('../services');
const { catchAsync } = require('../utils/error');

const createWish = catchAsync(async (req, res) => {
  console.log("controller입니당")

  const { productId } = req.body;
  console.log(productId)
  if (!productId) {
    const err = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw err;
  }
  const userId = users.id
  
  const createWish = await wishService.createWish(productId, userId)


  return res.status(201).json({ message: "CREATE_SUCCESS" })
})


const removeWish = catchAsync(async (req, res) => {
  const { productId, userName } = req.body;
  if (!productId || !userName) {
    const err = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw err;
  }
  const result = await wishService.removeWish(productId || userName)
  return res.status(200).json({ message: "DELETE_SUCCESS" })
})
module.exports = {
  createWish,
  removeWish
}