const bcrypt = require('bcrypt');

const { statusCode, messageCode } = require('../config');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hash) => {
        const isPasswordMatced = await bcrypt.compare(password, hash);

        if (!isPasswordMatced) {

            throw new Error(statusCode.BAD_REQUEST, messageCode.WRONG_PASSWORD);

        }
    }
};
