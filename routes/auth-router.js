const router = require('express').Router();

const { authController} = require('../controlles');
const { authMiddleware} = require('../middleware');
const {check} = require("express-validator");
const {messageCode, constantsConfig} = require("../config");

router.post(constantsConfig.REGISTRATION,
    check(constantsConfig.EMAIL, messageCode.INCORRECT_EMAIL).isEmail(),
    check(constantsConfig.PASSWORD, messageCode.MINIMUM_LENGTH_PASSWORD).isLength({min:6}),
    authMiddleware.isUserEmailNotPresent,
    authController.register);

router.post(constantsConfig.LOGIN,
    authMiddleware.isUserEmailPresent,
    authMiddleware.isUserPasswordPresent,
    authController.login);


router.get(constantsConfig.LOGOUT,
    authController.logout);

router.get(constantsConfig.REFRESH,
    authMiddleware.delOldToken,
    authController.refresh);

router.delete(constantsConfig.THIS,  authController.deleteUser);

module.exports = router;
