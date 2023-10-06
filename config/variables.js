require('dotenv').config();

module.exports = {
    ACTIVATE_TOKEN_URL: 'https://o-react.vercel.app/auth/activate/',
    CANCEL_URL: 'https://o-react.vercel.app/*',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_world',
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'action_world',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh_world',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb+srv://sokolavanila22:QeMLeFGPkvDA8pjG@olenastudiocluster.ketyl47.mongodb.net/?retryWrites=true&w=majority',
    NODE_ENV: process.env.NODE_ENV || 'dev',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    PORT: process.env.PORT || 5000,
    PORT_3000: 'https://o-react.vercel.app',

    SECRET_KEY_STRIPE: process.env.SECRET_KEY_STRIPE,
    SUCCESS_URL: 'https://o-react.vercel.app/products',
};
