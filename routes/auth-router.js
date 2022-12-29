const router = require('express').Router();

const {check} = require("express-validator");
const {authController} = require('../controlles');
const {authMiddleware} = require('../middleware');
const {messageCode, constantsConfig} = require("../config");

router.get(constantsConfig.LOGOUT,
    authController.logout);

router.get(constantsConfig.REFRESH,
    authMiddleware.delOldToken,
    authController.refresh);

router.delete(constantsConfig.THIS, authController.deleteUser);

router.post(constantsConfig.LOGIN,
    authMiddleware.isUserEmailPresent,
    authMiddleware.isUserPasswordPresent,
    authController.login);

router.post(constantsConfig.REGISTRATION,
    check(constantsConfig.EMAIL, messageCode.INCORRECT_EMAIL).isEmail(),
    check(constantsConfig.PASSWORD, messageCode.MINIMUM_LENGTH_PASSWORD).isLength({min: 6}),
    authMiddleware.isUserEmailNotPresent,
    authController.register);

// router.patch('/',
//
//     userMiddleware.isUserPresent,
//     userMiddleware.checkUniqueEmail,
//     userMiddleware.checkPassword,
//     userConttoller.updateUser);

module.exports = router;
