const { UserDB } = require('../dataBase');
const { statusCode, messageCode } = require('../config');

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
    }
};
