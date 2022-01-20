const { UserDB } = require('../dataBase');
const { statusCode, messageCode } = require('../config');
const { userValidator } = require('../validators');

module.exports = {
    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await UserDB.findOne({ email });

            if (userByEmail) {

                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.CONFLICT_EMAIL
                })
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkUniqueUsername: async (req, res, next) => {
        try {
            const { name } = req.body;

            const userByEmail = await UserDB.findOne({ name });

            if (userByEmail) {

                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.CONFLICT_USERNAME
                })
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserPresent: async (req, res, next) => {
        try {
            const { username } = req.body;

            const user = await UserDB.findOne({ username });

            if (!user) {

                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_FOUND
                })
            }
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkPassword: async (req, res, next) => {
        try {
            const { password, pereatPassword } = req.body;

            if(password !== pereatPassword) {

                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.CONFLICT_PASSWORD
                })
            }


            next();
        } catch (e) {
            next(e);
        }
    },
    validateUserBody: (req, res, next) => {
        try {
            const { error } = userValidator.validator.validate(req.body);

            if (error) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.BAD_DATE
                })
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isEmptyFields: (req, res, next) => {
        try {
            const { error } = userValidator.empty.validate(req.body);

            if (error) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.EMPTY_FIELDS
                })
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
