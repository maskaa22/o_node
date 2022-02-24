const router = require('express').Router();

const { authController } = require('../controlles');
const { authMiddleware } = require('../middleware');
const {check} = require("express-validator");

router.post('/registration',
    check('email', 'Некоректный емейл').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min:6}),
    authMiddleware.isUserEmailNotPresent,
    authController.register);

router.post('/login',
    authMiddleware.isUserEmailPresent,
    authMiddleware.isUserPasswordPresent,
    authController.login);


router.get('/logout',
    authController.logout);

router.get('/refresh', authController.refresh);

module.exports = router;
