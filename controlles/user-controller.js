const {emailServise} = require("../servises");
const passwordServise = require("../servises/password-servise");
const {statusCode, messageCode, constantsConfig} = require("../config");
const {UserDB, OAuth} = require('../dataBase');
const UserDto = require("../utils/UserDto");
const {userNormalizator, userNormalizatorForAuth} = require("../utils/user.util");
const uuid = require("uuid");
const path = require("path");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await UserDB.find().where({role: 'user'});

            if (!users) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_FOUNDS
                });
            }

            const userToReturn = userNormalizator(users);

            res.json(userToReturn);
        } catch (e) {
            console.log(e);
            next(e);
        }
    },
    updateAllData: async (req, res, next) => {
        try {
            const {_id, email, oldPassword, number, numberToo} = req.body;

            if (email !== '') {
                await UserDB.updateOne({_id}, {email: email});
            }

            if (oldPassword !== '' && number !== '' && numberToo !== '') {
                const user = await UserDB.findById({_id});

                const password = await passwordServise.compare(oldPassword, user.password);

                if (!password) {
                    return res.status(statusCode.CONFLICT).json({
                        message: messageCode.INCORRECT_PASSWORD
                    });
                }
                if (number === numberToo) {
                    const hashedPassword = await passwordServise.hash(number);
                    await UserDB.updateOne({_id}, {password: hashedPassword});
                } else return res.status(statusCode.CONFLICT).json({
                    message: messageCode.INCORRECT_PASSWORD
                })
            }

            if ((oldPassword !== '' && number === '' && numberToo === '') || (oldPassword !== '' && number !== '' && numberToo === '') ||
                (oldPassword !== '' && number === '' && numberToo !== '') || (oldPassword === '' && number !== '' && numberToo !== '')) {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.CHANGE_PASSWORD
                });
            }

            //TODO сделать в базе поле FOTO
            // if(foto!=='') {
            //     await UserDB.updateOne({_id}, {foto: foto});
            // }

            res.status(statusCode.OK).json({
                message: messageCode.DATA_IS_SAVED
            });
        } catch (e) {
            next(e);
        }
    },
    updateData: async (req, res, next) => {
        try {
            const {_id} = req.body;

            const users = await UserDB.findById({_id});

            if (!users) {
                res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_FOUND
                });
            }

            const userToReturn = new UserDto(users);

            res.json({...userToReturn});
        } catch (e) {
            next(e);
        }
    },
    sendUser: async (req, res, next) => {
        try {
            const {text, email, topic} = req.body;

            const send = await emailServise.sendMail(email, text, topic);

            res.json(send);
        } catch (e) {
            next(e);
        }
    },
    addFoto: async (req, res, next) => {
        try {
            const {_id} = req.body;

            const {foto} = req.files;
            let fileName = uuid.v4()+".jpg";
            const pathFile = path.resolve(__dirname, '..', 'static', fileName);
            foto.mv(pathFile);

            await UserDB.updateOne({_id}, {foto: fileName});

            const user = await UserDB.findById({_id})

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    findIdUser: async (req, res, next) => {
        try {

            const {refresh_token} = req.cookies;
console.log(refresh_token);
            const user = await OAuth.findOne({refresh_token: refresh_token}).populate(constantsConfig.USER_ID);
            console.log(user);
// console.log(tokenRespons.user_id);
//const user = tokenRespons
//             const user = userNormalizatorForAuth(tokenRespons);
// console.log(user);

            //const user = userToReturn.user_id;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
};
