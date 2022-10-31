const { UserDB } = require('../dataBase');
// const { userUtil: { userNormalizator } } = require('../utils');
const {statusCode, messageCode} = require("../config");
const passwordServise = require("../servises/password-servise");
const {userNormalizator} = require("../utils/user.util");
const UserDto = require("../utils/UserDto");
const {emailServise} = require("../servises");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await UserDB.find();

            if(!users) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_FOUNDS
                })
            }

            const userToReturn = userNormalizator(users);

            // const userToReturn = new UserDto(users);
            // console.log(userToReturn);

            res.json(userToReturn);
        } catch (e) {
            console.log(e);
            next(e);
        }
    },
    // getSingleUsers: async (req, res, next) => {
    //     try {
    //         const { user_id } = req.params;
    //
    //         const users = await UserDB.findById(user_id);
    //
    //         res.json(users);
    //     } catch (e) {
    //         next(e);
    //     }
    // },
    updateAllData: async (req, res, next) => {
        try {
            const { _id, email, oldPassword, number, numberToo } = req.body;

            if(email!=='') {
                await UserDB.updateOne({_id}, {email: email});
            }

            if(oldPassword!=='' && number!=='' && numberToo!=='')
            {
                const user = await UserDB.findById({_id});

                const password = await passwordServise.compare(oldPassword, user.password);

                if(!password) {
                    return res.status(statusCode.CONFLICT).json({
                        message: messageCode.INCORRECT_PASSWORD
                    })
                }
                if(number===numberToo) {
                    const hashedPassword = await passwordServise.hash(number);
                    await UserDB.updateOne({_id}, {password: hashedPassword});
                }
                else return res.status(statusCode.CONFLICT).json({
                    message: messageCode.INCORRECT_PASSWORD
                })
            }

            if((oldPassword!=='' && number==='' && numberToo==='') || (oldPassword!=='' && number!=='' && numberToo==='') ||
                (oldPassword!=='' && number==='' && numberToo!=='') || (oldPassword==='' && number!=='' && numberToo!==''))
            {
                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.CHANGE_PASSWORD
                })
            }

            //TODO сделать в базе поле FOTO
            // if(foto!=='') {
            //     await UserDB.updateOne({_id}, {foto: foto});
            // }

            //res.json('Сообщение и код');
            res.status(statusCode.OK).json({
                message: messageCode.DATA_IS_SAVED
            })
        } catch (e) {
            next(e);
        }
    },
    // updateContactData: async (req, res, next) => {
    //     try {
    //         const { _id } = req.body;
    //
    //         const users = await UserDB.findById({_id})
    //
    //         if(!users) {
    //             res.status(statusCode.NOT_FOUND).json({
    //                 message: messageCode.NOT_FOUND
    //             })
    //         }
    //
    //         const userToReturn = new UserDto(users);
    //
    //         res.json({...userToReturn});
    //     } catch (e) {
    //         next(e);
    //     }
    // },
    updateData: async (req, res, next) => {
        try {
            const { _id } = req.body;

            const users = await UserDB.findById({_id});

            if(!users) {
                res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_FOUND
                })
            }

            const userToReturn = new UserDto(users);

            res.json({...userToReturn});
        } catch (e) {
            next(e);
        }
    },
    sendUser: async (req, res, next) => {
        try {
            const { text, email, topic } = req.body;

            const send = await emailServise.sendMail(email, text, topic);

            res.json(send);
        } catch (e) {
            next(e);
        }
    },

    // updateUser: async (req, res, next) => {
    //     try {
    //         const { username } = req.body;
    //         const newUser = req.body;
    //
    //         await UserDB.updateUserWithHashPassword({username}, newUser);
    //
    //         return res.status(statusCode.OK).json({
    //             message: messageCode.UPDATED
    //         })
    //     } catch (e) {
    //         next(e);
    //     }
    // },
    // deleteUser: async (req, res, next) => {
    //     try {
    //         const { username } = req.body;
    //
    //         await UserDB.deleteOne({username});
    //
    //         return res.status(statusCode.OK).json({
    //             message: messageCode.DELETED
    //         })
    //     } catch (e) {
    //         next(e);
    //     }
    // }
};
