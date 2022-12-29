const {passwordServise, jwtServise} = require("../servises");
const {statusCode, messageCode} = require("../config");
const {UserDB, OAuth} = require("../dataBase");

module.exports = {
    isUserEmailPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.FILL_FIELDS
                });
            }

            const userByEmail = await UserDB.findOne({email}).select('+password').lean();

            if (!userByEmail) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.CONFLICT_EMAIL
                });
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserEmailNotPresent: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.FILL_FIELDS
                });
            }

            const userByEmail = await UserDB.findOne({email}).select('+password').lean();

            if (userByEmail) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.THIS_USER_ALREADY_EXISTS
                });
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserPasswordPresent: async (req, res, next) => {
        try {
            const {password} = req.body;

            if (!password) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.FILL_FIELDS
                });
            }

            const {password: hashPassword} = req.user;

            await passwordServise.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(statusCode.UNAUTHORIZED).json({message: messageCode.NOT_FOUND});
            }

            const decoder = await jwtServise.verifyToken(token);

            if (!decoder) {
                return res.status(statusCode.NOT_FOUND).json({message: messageCode.NOT_FOUND});
            }

            req.user = decoder;
            req.token = token;

            next();
        } catch (e) {
            next(e);
        }
    },
    delOldToken: async (req, res, next) => {
        try {

            const date = new Date();

            const oldDate = new Date(date.getFullYear(), date.getMonth() - 2, 1);

            const find = await OAuth.find();

            find.map(async date => {
                if (date.createdAt < oldDate) {
                    await OAuth.deleteOne({createdAt: date.createdAt});
                }
            })

            next();
        } catch (e) {
            next(e);
        }
    }
};
