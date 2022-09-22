const database = require('./dataSource');

const getUserByUsername = async (username) => {
  const [user] = await database.query(
    `SELECT
            id,
            username,
            fullname,
            password,
            phone_number,
            address,
            gender,
            birth
    FROM users
    WHERE username = ?
        `,
    [username]
  );
  if (user === undefined) {
    const error = new Error('USER_NOT_FOUND');
    error.statusCode = 400;
    throw error;
  }
  return user;
};

module.exports = {
  getUserByUsername,
};
