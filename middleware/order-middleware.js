const {statusCode, messageCode} = require('../config');

module.exports = {
    checkEmptyFields: async (req, res, next) => {
        try {
            const {user_name, surname, phone, nameSity, nameDepartment, pay, cart, status, summa, month} = req.body;

            if (user_name === '' || surname === '' || phone === '' || nameSity === '' || nameDepartment === '' ||
                pay === '' || cart === '' || status === '' || summa === '' || month === '') {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: messageCode.EMPTY_FIELDS
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
