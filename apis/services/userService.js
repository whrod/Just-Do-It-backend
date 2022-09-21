const { userDao } = require('../models');
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUsername, validatePassword } = require('../utils/validators')

// const signUp = async () => {

// }

const signIn = async (username, password) => {

    validateUsername(username);
    validatePassword(password);

    const user = await.userDao.getUserByUsername();
    const passwordMatch = await bcyrpt.compare(password, user.password)

    if(!passwordMatch) {
        const error = new Error('WRONG_PASSWORD')
        error.statusCode = 400

        throw error;
    }

    return accessToken = jwt.sign({id:user.id}, process.env.JWT_SECRET,
        {
            algorithm : process.env.ALGORITHM,
            expiresIn : process.env.JWT_EXPIRES_IN
        }
    )
};

module.exports = {
    // signUp,
    signIn,
}