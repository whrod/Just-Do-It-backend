const { userService } = require('../services');
const { catchAsync } = require('../utils/error');

const signIn = catchAsync(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;

    throw error;
  }

  const loggedInUser = await userService.signIn(userName, password);

  res
    .status(200)
    .send({ fullName: loggedInUser[0], accessToken: loggedInUser[1] });
});

const getPing = async (req, res) => {
  await res.status(200).send({ message: 'pong' });
};

module.exports = {
  signIn,
  getPing,
};
