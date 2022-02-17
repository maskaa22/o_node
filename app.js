const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { userRouter, authRouter, productRouter, categoryRouter } = require('./routes');
const {
    variablesConfig: { PORT, MONGO_CONNECT_URL }, messageCode
} = require('./config');

mongoose.connect(MONGO_CONNECT_URL);

const app = express();


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.json({ extended: true }));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/category', categoryRouter);

app.listen(PORT, () => {
    console.log(messageCode.RUNNING, PORT);
});
