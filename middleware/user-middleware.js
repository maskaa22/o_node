const {statusCode, messageCode} = require('../config');
const {UserDB} = require('../dataBase');
const {USER} = require("../config/user-roles-enum");

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {user_id} = req.body;

            const user = await UserDB.findById({_id: user_id});

            if (!user) {

                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.NOT_FOUND
                });
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkContactData: async (req, res, next) => {
        try {
            const {name, surname, phone} = req.body;

            if (name === '' && surname === '' && phone === '') {

                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.FILL_FIELDS
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkAdressData: async (req, res, next) => {
        try {
            const {nameSity, nameDepartment} = req.body;

            if (nameSity === '' && nameDepartment === '') {

                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.FILL_FIELDS
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkAllData: async (req, res, next) => {
        try {
            const {name, surname, email, phone, oldPassword, number, numberToo, nameSity, nameDepartment} = req.body;

            if (name === '' && surname === '' && email === '' && phone === '' && oldPassword === '' && number === ''
                && numberToo === '' && ((nameSity === undefined && nameDepartment === undefined) || (nameSity === '' && nameDepartment === ''))) {

                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.FILL_FIELDS
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    updateContactDataMiddleware: async (req, res, next) => {
        try {
            const {_id, name, surname, phone} = req.body;

            if(!_id) {
                return res.status(statusCode.NOT_FOUND).json({
                    message: messageCode.FILL_FIELDS
                });
            }

            if (name !== '') {
                await UserDB.updateOne({_id}, {name: name});
            }
            if (surname !== '') {
                await UserDB.updateOne({_id}, {surname: surname});
            }
            if (phone !== '') {
                await UserDB.updateOne({_id}, {phone: phone});
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    updateAdressDataMiddleware: async (req, res, next) => {
        try {
            const {_id, nameSity, nameDepartment} = req.body;

            if (nameSity !== '') {
                await UserDB.updateOne({_id}, {nameSity: nameSity});
            }
            if (nameDepartment !== '') {
                await UserDB.updateOne({_id}, {nameDepartment: nameDepartment});
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkRole: async (req, res, next) => {
        try {
            const _id = req.user.decoder.id;

            const user = await UserDB.findById({_id});

            if(user.role===USER) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.ROLE_ADMIN
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
