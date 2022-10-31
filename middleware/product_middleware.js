const {passwordServise, jwtServise} = require("../servises");
const {UserDB, OAuth} = require("../dataBase");
const {statusCode, messageCode} = require("../config");

module.exports = {
    // checkInventoryNumber: async (req, res, next) => {
    //     try {
    //         const { email } = req.body;
    //
    //         if(!email) {
    //             return res.status(statusCode.NOT_FOUND).json({
    //                 message: messageCode.FILL_FIELDS
    //             })
    //         }
    //
    //         const userByEmail = await UserDB.findOne({ email }).select('+password').lean();
    //
    //
    //         if (!userByEmail) {
    //             return res.status(statusCode.NOT_FOUND).json({
    //                 message: messageCode.CONFLICT_EMAIL
    //             })
    //         }
    //
    //         req.user = userByEmail;
    //
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // },

};
