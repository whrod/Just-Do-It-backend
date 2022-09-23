const { userService } = require('../services');
const { catchAsync } = require('../utils/error');


const signUp = async (req, res) => {

    try {
        const { userName, password, fullName, phoneNumber, address, birth, gender } = req.body
        console.log(userName, password, fullName, phoneNumber, address, birth, gender)
        if (!userName || !password || !fullName || !phoneNumber || !address || !birth || !gender) {
            const err = new Error("KEY_ERRROR");
            err.statusCode = 400;
            throw err
        }
        await userService.signUp(userName, password, fullName, phoneNumber, address, birth, gender);
        return res.status(201).json({ message: "userCreated" });
    }
    catch (err) {
        res.status(err.statusCode || 580).json({ message: err.message });
    }
}


const signIn = catchAsync(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error;
    }

    const accessToken = await userService.signIn(username, password);
    res.status(200).send({ accessToken: accessToken });
});

const getPing = async (req, res) => {
    await res.status(200).send({ message: 'pong' });
};

module.exports = {

    signUp,
    signIn,
    getPing,
};