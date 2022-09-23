const { userService } = require('../services')

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

module.exports = {
    signUp,

}