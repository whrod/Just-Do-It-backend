const database = require('./dataSource');

// const signUp = async () => {
//     await database.query(

//     )
// }

const getUserByUsername = async (username) => {
    await database.query(
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
        WHERE = ?
        `,
        [username]
    )
}

module.exports = {
    // signUp,
    getUserByUsername
}