const database = require('./dataSource');

const getUserByUsername = async (userName) => {
  const [user] = await database.query(
    `
    SELECT
        id,
        username AS userName,
        fullname AS fullName,
        password,
        phone_number AS phoneNumber,
        address,
        gender,
        birth
    FROM users
    WHERE username = ?
        `,
    [userName]
  );
  return user;
};

const getUserById = async (id) => {
  const [user] = await database.query(
    `
    SELECT
        id,
        username,
        fullname,
        phone_number,
        address
    FROM users
    WHERE id = ?
    `,
    [id]
  );
  return user;
};

module.exports = {
  getUserByUsername,
  getUserById,
};
