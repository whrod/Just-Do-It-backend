const { userSerive } = require('../services')

// const signUp = async() => {
// }

const signIn = async(req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400

        throw error;
    }

    const accessToken = userService.signIn(username, password);
    
    res.status(200).send({ accessToken : accessToken})
}

const getPing = async (req, res) => {
    await res.status(200).send({message : "pong"});
}

module.exports = {
    // signUp,
    signIn,
    getPing
}