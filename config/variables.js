module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT || 5000,
    //MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb+srv://text:text@cluster0.zddx9.mongodb.net/textDB?retryWrites=true&w=majority'
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/june-2021',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_world',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh_world',
};
