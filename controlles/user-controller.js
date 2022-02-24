const { UserDB } = require('../dataBase');
// const { userUtil: { userNormalizator } } = require('../utils');
const {statusCode, messageCode} = require("../config");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await UserDB.find();

            res.json(users);
        } catch (e) {
            console.log(e);
            next(e);
        }
    },
    getSingleUsers: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const users = await UserDB.findById(user_id);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { username } = req.body;
            const newUser = req.body;

            await UserDB.updateUserWithHashPassword({username}, newUser);

            return res.status(statusCode.OK).json({
                message: messageCode.UPDATED
            })
        } catch (e) {
            next(e);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { username } = req.body;

            await UserDB.deleteOne({username});

            return res.status(statusCode.OK).json({
                message: messageCode.DELETED
            })
        } catch (e) {
            next(e);
        }
    }
};
