const {emailService} = require("../servises");
const {statusCode, messageCode} = require("../config");

module.exports = {
    sendEmail: async (req, res, next) => {
        try {
            const {name, email, phone, text} = req.body;
            console.log(name, email, phone, text)

            if (!name || !email || !phone || !text) {
                return res.status(statusCode.NOT_FOUND).json({message: messageCode.EMPTY_FIELDS});
            }

            const send = await emailService.sendMailForUs(name, email, phone, text);

            if(!send) {
                return res.status(statusCode.BAD_REQUEST).json({message: messageCode.INCORRECT_DATA});
            }

            res.json(send);
        } catch (e) {
            next(e);
        }
    }
};
