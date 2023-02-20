const {emailServise} = require("../servises");
const {statusCode, messageCode} = require("../config");

module.exports = {
    sendEmail: async (req, res, next) => {
        try {
            const {name, email, phone, text} = req.body;

            if (!name || !email || !phone || !text) {
                return res.status(statusCode.BAD_REQUEST).json({message: messageCode.EMPTY_FIELDS});
            }

            const send = await emailServise.sendMailForUs(name, email, phone, text);

            res.json(send);
        } catch (e) {
            next(e);
        }
    }
};
