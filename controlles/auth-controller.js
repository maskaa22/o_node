const {validationResult} = require("express-validator");

const {ACTION, LOCALES, OPTIONS, RESET_PASSWORD_FOR_LINK, USERS_IS_ACTIVE} = require("../config/constants");
const {jwtServise, emailServise, passwordServise, deleteFileServise} = require("../servises");
const {OK} = require("../config/status-code");
const {REFRESH} = require("../config/token-type.enum");
const {statusCode, messageCode, constantsConfig} = require("../config");
const {UserDB, OAuth, ActionDB, UserAnalyzeDB} = require("../dataBase");
const {userNormalizator, userNormalizatorForAuth,} = require("../utils/user.util");
const {PORT_3000} = require("../config/variables");

module.exports = {
    register: async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(statusCode.BAD_REQUEST).json({
                    errors: errors.array(),
                    message: messageCode.INCORRECT_DATA
                });
            }

            const createdUser = await UserDB.createUserWithHashPassword(req.body);

            if (!createdUser) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.CHECK_THE_DATA
                });
            }

            const token = jwtServise.createActionToken();

            await ActionDB.create({token, type: ACTION, user_id: createdUser._id});

            await emailServise.emailForRegistration(createdUser.email, createdUser.name, token);

            const month = new Date().toLocaleString(LOCALES, {month: OPTIONS});

            const userFind = await UserAnalyzeDB.findOne({month: month});

            if (!userFind) {
                await UserAnalyzeDB.create({count: 1, month: month});
            } else {
                const count = Number(userFind.count) + 1;

                await UserAnalyzeDB.updateOne({month: month}, {count: count});
            }

            const userToReturn = userNormalizator(createdUser);

            if (createdUser) {
                return res.status(statusCode.OK).json({
                    message: messageCode.CREATED
                });
            }

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },
    login: async (req, res, next) => {
        try {
            const {user} = req;

            const tokenPair = jwtServise.generateTokenPair(user._id);

            if (!tokenPair) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.INCORRECT_DATA
                });
            }

            const userToReturn = userNormalizator(user);

            await OAuth.create({
                ...tokenPair,
                user_id: user._id
            });

            res.cookie(constantsConfig.REFRESH_TOKEN, tokenPair.refresh_token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json({
                user: userToReturn,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(statusCode.UNAUTHORIZED).json({message: messageCode.NOT_FOUND});
            }

            const tokenData = await OAuth.deleteOne({access_token: token});

            if (!tokenData) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.INCORRECT_DATA
                });
            }

            return res.json(tokenData);
        } catch (e) {
            next(e);
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {refresh_token} = req.cookies;

            if (!refresh_token) {
                return res.status(statusCode.UNAUTHORIZED).json({message: messageCode.NOT_FOUND});
            }

            const decoder = await jwtServise.verifyToken(refresh_token, REFRESH);

            const tokenRespons = await OAuth.findOne({refresh_token: refresh_token}).populate(constantsConfig.USER_ID);

            const userToReturn = userNormalizatorForAuth(tokenRespons);

            if (!decoder || !tokenRespons) {
                return res.status(statusCode.UNAUTHORIZED).json({message: messageCode.NOT_FOUND});
            }

            const tokenPair = jwtServise.generateTokenPair();

            if (!tokenPair) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.INCORRECT_DATA
                });
            }

            await OAuth.updateOne({refresh_token: refresh_token},
                {
                    access_token: tokenPair.access_token,
                    refresh_token: tokenPair.refresh_token
                });

            const user = userToReturn.user_id;

            res.cookie(constantsConfig.REFRESH_TOKEN, tokenPair.refresh_token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            res.json({tokenPair, user});
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const {email} = req.query;

            if (!email) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.INCORRECT_EMAIL
                });
            }

            const user = await UserDB.findOne({email});

            deleteFileServise.deleteFile(user.foto);

            await UserDB.deleteOne({email});

            return res.status(statusCode.OK).json({
                message: messageCode.DELETE_USER
            });
        } catch (e) {
            next(e);
        }
    },
    sendEmailForResetPassword: async (req, res, next) => {
        try {
            const user = req.user;

            const email = user.email;
            const name = user.name;
            const user_id = user._id.toString();
            const link = `${PORT_3000}/:${user_id}/${RESET_PASSWORD_FOR_LINK}`;

            const send = await emailServise.sendMailForResetPassword(email, name, link);

            res.json(send);
        } catch (e) {
            next(e);
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const {password, passwordToo, _id} = req.body;

            if (password === passwordToo) {
                const hashedPassword = await passwordServise.hash(password);

                await UserDB.updateOne({_id}, {password: hashedPassword});
            }

            res.json(OK);
        } catch (e) {
            next(e);
        }
    },
    activate: async (req, res, next) => {
        try {
            const {_id} = req.user;

            await UserDB.updateOne({_id}, {is_active: true});

            res.json(USERS_IS_ACTIVE);
        } catch (e) {
            next(e);
        }
    },
};
