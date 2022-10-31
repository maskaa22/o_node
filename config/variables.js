require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || 5000,
    //MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb+srv://text:text@cluster0.zddx9.mongodb.net/textDB?retryWrites=true&w=majority'
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june-2021',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_world',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh_world',

    SECRET_KEY_STRIPE:process.env.SECRET_KEY_STRIPE,
    SUCCESS_URL:'http://localhost:3000/products',
    CANCEL_URL: 'http://localhost:3000/*',

    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
};
