const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const {
    GET,
    POST,
    DELETE,
    UPDATE,
    PUT,
    PATCH,
    USERS,
    AUTH,
    PRODUCTS,
    CATEGORY_,
    CREATE_CHECKOUT_SESSION,
    HOME,
    CONTACT, STATIC, DOCS,
} = require("./config/constants");
const {PORT_3000} = require("./config/variables");
const swaggerJson = require('./docs/swagger.json')
const {
    userRouter,
    authRouter,
    productRouter,
    categoryRouter,
    paymentRouter,
    homeRouter,
    contactRouter
} = require('./routes');
const {
    variablesConfig: {PORT, MONGO_CONNECT_URL}, messageCode
} = require('./config');

mongoose.connect(MONGO_CONNECT_URL);

const app = express();

app.use(cors({
    credentials: true, origin: PORT_3000, methods: [GET, POST, DELETE, UPDATE, PUT, PATCH],
}));

app.use(express.json({extended: true}));
app.use(express.static(path.resolve(__dirname, STATIC)));
app.use(fileUpload({}));
app.use(cookieParser());
app.use(DOCS, swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use(AUTH, authRouter);
app.use(CATEGORY_, categoryRouter);
app.use(CONTACT, contactRouter);
app.use(CREATE_CHECKOUT_SESSION, paymentRouter);
app.use(HOME, homeRouter);
app.use(PRODUCTS, productRouter);
app.use(USERS, userRouter);

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(messageCode.RUNNING, PORT);
        });  
    }
    catch {
        console.log('Sorry!!!')
    }
}
start();
