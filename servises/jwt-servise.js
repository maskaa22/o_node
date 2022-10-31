const jwt = require('jsonwebtoken');

const {
    variablesConfig: {
        JWT_ACCESS_SECRET,
        JWT_REFRESH_SECRET
    },
    tokenTypeEnum: {ACCESS}
} = require('../config');

module.exports = {
    generateTokenPair: (id) => {
        const access_token = jwt.sign({id}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({id}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },
    verifyToken: async (token, tokenType = ACCESS) => {
        try {

            const secret = tokenType === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            const decoder = await jwt.verify(token, secret);

            return {decoder}
        } catch (e) {
            return null;
        }
    }
};
