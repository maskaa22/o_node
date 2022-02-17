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
           // console.log(tokenPair.refresh_token);
            res.cookie('refresh_token', tokenPair.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

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
            // const {refreshToken}=req.coockies;
            // const token = await userServise.logout(refreshToken);
            // res.clearCocies('refreshToken');
            // return res.json(token);
            //
            // const token = await tokenServise.removeToken(refreshToken);
            // return token
            //
            // const tokenData = await tokenModel.deleteOne({refreshToken})
            // return tokenData

            //const {refreshToken}=req.coockies;
            const token = req.headers.authorization.split(' ')[1];
            //const token = req.get("Authorization");
            if (!token) {
                return res.status(401).json({message: 'Auth error'})
            }

            const tokenData = await OAuth.deleteOne({access_token: token})

            return res.json(tokenData)
        } catch (e) {
            next(e);
        }
    },
    auth: async (req, res, next) => {
        try {
            const user = await UserDB.findOne(req.user._id)
//console.log(req.tokenPara); //refresh
            if(!user) {
                return res.status(408).json({message: 'Пользователь NO авторизирован'})
            }
            // await OAuth.updateOne({user_id: user._id}, {access_token: req.token});
            //

                        const tokenPair =  jwtServise.generateTokenPair();

//             const p = await OAuth.updateOne({ refresh_token: req.tokenPara }, { ...tokenPair });
// console.log('3', p);


            res.json({
                user: user,
                access_token: req.token,
                //...tokenPair
            });

            // const tokenPair = jwtServise.generateTokenPair();
            // await OAuth.create({
            //     ...tokenPair,
            //     user_id: user._id
            // });

            // res.json({
            //     user: user,
            //     ...tokenPair
            // });
            //res.json(user);
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

            //const qq = await OAuth.updateOne({ user_id: decoder.id }, { ...tokenPair });

            const user = tokenRespons.user_id;


             res.cookie('refresh_token', tokenPair.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            res.json( {tokenPair, user});


        } catch (e) {
            next(e);
        }
    }
}
