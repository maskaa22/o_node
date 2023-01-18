const jwt = require('jsonwebtoken');

const {
    variablesConfig: {
        JWT_ACCESS_SECRET,
        JWT_REFRESH_SECRET
    },
    tokenTypeEnum: {ACCESS, REFRESH, ACTION}
} = require('../config');
const {JWT_ACTION_SECRET} = require("../config/variables");

module.exports = {
     generateTokenPair: (id) => {
        const access_token = jwt.sign({id}, JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refresh_token = jwt.sign({id}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },
    verifyToken: async (token, tokenType = ACCESS) => {
        try {

            //const secret = tokenType === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            let secret = '';

            switch (tokenType) {
                case ACCESS:
                    secret = JWT_ACCESS_SECRET;
                    break;
                case REFRESH:
                    secret = JWT_REFRESH_SECRET;
                    break;
                case ACTION:
                    secret = JWT_ACTION_SECRET;
                    break;
                default:
                   // throw new ErrorHandler(statusCode.SERVER_ERROR, messageCode.WRONG_TOKEN);
            }

            const decoder = await jwt.verify(token, secret);

            return {decoder}
        } catch (e) {
            return null;
        }
    },
    createActionToken: () => jwt.sign({}, JWT_ACTION_SECRET, { expiresIn: '1d' })
};
