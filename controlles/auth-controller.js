const {UserDB, OAuth} = require("../dataBase");
const {statusCode, messageCode} = require("../config");
const {userNormalizator} = require("../utils/user.util");
const {validationResult} = require("express-validator");
const {jwtServise} = require("../servises");

module.exports = {
    register: async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные при регистрации'
                })
            }
            const { email } = req.body;
            const userByEmail = await UserDB.findOne({ email }).select('+password').lean();

            if (userByEmail) {
                return res.status(400).json({
                    message: "Такой пользователь уже существует"
                })
            }

            const createdUser = await UserDB.createUserWithHashPassword(req.body);

            const userToReturn = userNormalizator(createdUser);

            if(createdUser){
                return res.status(statusCode.OK).json({
                    message: messageCode.CREATED
                })
            }

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },
    login: async (req, res, next) => {
        try {
            const {user}  = req;


            const tokenPair = jwtServise.generateTokenPair(user._id);

            //const userToReturn = userNormalizator(user);

            await OAuth.create({
                ...tokenPair,
                user_id: user._id
            });

            res.cookie('refresh_token', tokenPair.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json({
                user: user,
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
                return res.status(401).json({message: 'Auth error'})
            }

            const tokenData = await OAuth.deleteOne({access_token: token});

            return res.json(tokenData);
        } catch (e) {
            next(e);
        }
    },
    refresh: async (req, res, next) => {
        try {
             const {refresh_token} = req.cookies;

            if (!refresh_token) {
                return res.status(401).json({message: 'Токина нет!'})
            }
            const decoder = await jwtServise.verifyToken(refresh_token, 'refresh');

            const tokenRespons = await OAuth.findOne({ refresh_token: refresh_token }).populate('user_id');


            if (!decoder || !tokenRespons) {
                return res.status(401).json({message: 'Токина нет в БД!'})
            }
            const tokenPair = jwtServise.generateTokenPair();

            await OAuth.updateOne({ refresh_token: refresh_token },
                {access_token: tokenPair.access_token,
                        refresh_token: tokenPair.refresh_token});

            const user = tokenRespons.user_id;

            res.cookie('refresh_token', tokenPair.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            res.json( {tokenPair, user});
        } catch (e) {
            next(e);
        }
    }
};
