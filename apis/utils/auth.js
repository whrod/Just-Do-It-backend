const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const { catchAsync } = require('./error');

const loginRequired = catchAsync(async (req, res, next) => {

  const accessToken = req.headers.authorization;
  console.log(accessToken)
  if (!accessToken) {
    const error = new Error('NEED_ACCESSTOKEN');
    error.statusCode = 401;

    throw error;
  }
  const verifyToken = jwt.verify(accessToken, process.env.JWT_SECRET);
  const user = await userService.getUserById(verifyToken.id);

  if (!user) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;

    throw error;
  }

  req.user = user;
  console.log(req.user)
  next();
});

module.exports = {
  loginRequired,
};