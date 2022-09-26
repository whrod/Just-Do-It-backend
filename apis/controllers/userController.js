const { userSerive } = require('../services');

// const signUp = async() => {
// }

// const signIn = async() => {
// }

const getPing = async (req, res) => {
  await res.status(200).send({ message: 'pong' });
};

module.exports = {
  // signUp,
  // signIn,
  getPing,
};
