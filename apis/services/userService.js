const { userDao } = require('../models');
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signIn = async (username, password) => {
  const user = await userDao.getUserByUsername(username);

  if (user === undefined) {
    const error = new Error('USER_NOT_FOUND');
    error.statusCode = 400;

    throw error;
  }

  const passwordMatch = await bcyrpt.compare(password, user.password);

  if (!passwordMatch) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;

    throw error;
  }

  return (accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  }));
};

const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

module.exports = {
  signIn,
  getUserById,
};
