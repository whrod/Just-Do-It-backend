//id 5~15자 영문 숫자 조합
const validateUsername = (username) => {
  const usernameRegex = /^[0-9a-zA-Z]{5,15}$/;

  if (!usernameRegex.test(username)) {
    console.log(usernameRegex.test(username));
    const error = new Error('INVALID_USERNAME');
    error.statusCode = 400;

    throw error;
  }
};

//password 8~20 자, 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상
const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,20}$/;

  if (!passwordRegex.test(password)) {
    const error = new Error('INVALID_PASSWORD');
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  validateUsername,
  validatePassword,
};
