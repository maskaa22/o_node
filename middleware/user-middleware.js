const {statusCode, messageCode} = require('../config');
const {UserDB} = require('../dataBase');

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
    // updatePassword: async (req, res, next) => {
    //     try {
    //         const { _id, number, numberToo } = req.body;
    //
    //             if(number===numberToo) {
    //                 const hashedPassword = await passwordServise.hash(number);
    //                 await UserDB.updateOne({_id}, {password: hashedPassword});
    //             }
    //
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },
    checkPassword: async (req, res, next) => {
        try {
            const {password, pereatPassword} = req.body;

            if (password !== pereatPassword) {

                return res.status(statusCode.CONFLICT).json({
                    message: messageCode.INCORRECT_PASSWORD
                });
            }

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
    }
};
