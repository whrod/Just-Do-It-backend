const { userService } = require('../services');
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
  const { userName, password, fullName, phoneNumber, address, birth, gender } =
    req.body;
  console.log(req.body);
  if (
    !userName ||
    !password ||
    !fullName ||
    !phoneNumber ||
    !address ||
    !birth ||
    !gender
  ) {
    const err = new Error('KEY_ERRROR');
    err.statusCode = 400;
    throw err;
  }
  await userService.signUp(
    userName,
    password,
    fullName,
    phoneNumber,
    address,
    birth,
    gender
  );
  return res.status(201).json({ message: 'userCreated' });
});

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

module.exports = {
  signUp,
  signIn,
};
