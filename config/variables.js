require('dotenv').config();

module.exports = {
    ACTIVATE_TOKEN_URL: 'http://localhost:3000/auth/activate/',
    CANCEL_URL: 'http://localhost:3000/*',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_world',
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'action_world',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh_world',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june-2021',
    NODE_ENV: process.env.NODE_ENV || 'dev',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
    //MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb+srv://text:text@cluster0.zddx9.mongodb.net/textDB?retryWrites=true&w=majority'

    PORT: process.env.PORT || 5000,
    PORT_3000: 'http://localhost:3000',

    SECRET_KEY_STRIPE:process.env.SECRET_KEY_STRIPE,
    SUCCESS_URL:'http://localhost:3000/products',
};
