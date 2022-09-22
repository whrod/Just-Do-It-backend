const { userService } = require('../services');
const { catchAsync } = require('../utils/error');

const signIn = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  const accessToken = await userService.signIn(username, password);

  res.status(200).send({ accessToken: accessToken });
});

const getPing = async (req, res) => {
  await res.status(200).send({ message: 'pong' });
};

module.exports = {
  signIn,
  getPing,
};
