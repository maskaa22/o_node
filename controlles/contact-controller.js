const {emailServise} = require("../servises");

module.exports = {
    sendEmail: async (req, res, next) => {
        try {
            const {name, email, phone, text} = req.body;

            const send = await emailServise.sendMailForUs(name, email, phone, text);

            res.json(send);
        } catch (e) {
            next(e);
        }
    }
};
