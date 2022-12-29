const {validationResult} = require("express-validator");

const {jwtServise} = require("../servises");
const {statusCode, messageCode, constantsConfig} = require("../config");
const {UserDB, OAuth} = require("../dataBase");
const {userNormalizator, userNormalizatorForAuth,} = require("../utils/user.util");

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

            const decoder = await jwtServise.verifyToken(refresh_token, constantsConfig.REFRESH_FOR_TOKEN);

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

            await UserDB.deleteOne({email});

            return res.status(statusCode.OK).json({
                message: messageCode.DELETE_USER
            })
        } catch (e) {
            next(e);
        }
    }
};
