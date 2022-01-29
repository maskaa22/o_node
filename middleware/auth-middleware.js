const {passwordServise, jwtServise} = require("../servises");
const {check, body} = require("express-validator");
const {UserDB, OAuth} = require("../dataBase");
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
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            //const token = req.get('Authorization');

            if (!token) {
                return res.status(401).json({message: 'Пользователь не авторизирован'})
            }

            const decoder = await jwtServise.verifyToken(token);
// console.log(decoder);
            if(!decoder) {
                return res.status(401).json({message: 'Пользователь не !!!! авторизирован'})
            }

//             const tokenRespons = await OAuth.findOne({ access_token: token }).populate('user_id');
// console.log('11111 ----- ', tokenRespons);
// const refresh_token = tokenRespons.refresh_token
            //console.log('2', refresh_token);

//             const tokenPair =  jwtServise.generateTokenPair();
//
//             const p = await OAuth.updateOne({ refresh_token: refresh_token }, { ...tokenPair });
// console.log('3', p);
            //const user = tokenRespons.user_id;


            // if (!tokenRespons) {
            //     return res.status(400).json({message: 'Пользователь не авторизирован'})
            // }

            req.user = decoder
            req.token=token
            //req.tokenPara=refresh_token
            //req.refresh=refresh_token
            next();
        } catch (e) {
            next(e);
        }
    }
}
