const {passwordServise, jwtServise} = require("../servises");
const {check, body} = require("express-validator");
const {UserDB} = require("../dataBase");
const {statusCode, messageCode} = require("../config");
module.exports = {
    isUserEmailPresent: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByEmail = await UserDB.findOne({ email }).select('+password').lean();

            if (!userByEmail) {
                return res.status(400).json({
                    message: "Такого пользователя не существует"
                })
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserPasswordPresent: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { password: hashPassword } = req.user;

            await passwordServise.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },
    decoderToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({message: 'Auth error'})
            }

            const decoder = jwtServise.verifyToken(token);

            req.user = decoder
            req.token=token
            next();
        } catch (e) {
            next(e);
        }
    }
}
