const database = require('./dataSource');

const signUp = async (
  userName,
  password,
  fullName,
  phoneNumber,
  address,
  birth,
  gender
) => {
  try {
    return await database.query(
      `INSERT INTO users(
                username,
                password,
                fullname,
                phone_number,
                address,
                birth,
                gender
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
      [userName, password, fullName, phoneNumber, address, birth, gender]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const checkUsername = async (userName) => {
  try {
    const [user] = await database.query(
      `SELECT 
            username
            FROM users
            where username = ?
            `,
      [userName]
    );
    return user;
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};


const getUserByUsername = async (userName) => {
  const [user] = await database.query(
    `SELECT
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
        `, [userName]
  );
  return user;
};

const getUserById = async (id) => {
  const [user] = await database.query(
    `SELECT
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
  signUp,
  checkUsername,
  getUserByUsername,
  getUserById,
};

