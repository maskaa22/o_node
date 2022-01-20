const router = require('express').Router();

const { authController } = require('../controlles');
const { authMiddleware } = require('../middleware');
const {body, check} = require("express-validator");

router.post('/registration',
    //authMiddleware.bl,
    check('email', 'Некоректный емейл').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min:6}),
    authController.register);

router.post('/login',
    authMiddleware.isUserEmailPresent,
    authMiddleware.isUserPasswordPresent,
    authController.login);

router.get('/auth',
    authMiddleware.decoderToken,
    authController.auth);

router.get('/logout',

    authController.logout);

module.exports = router;
