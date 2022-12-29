const router = require('express').Router();

const {constantsConfig} = require("../config");
const {paymentController} = require("../controlles");

router.post(constantsConfig.THIS, paymentController.payment);

module.exports = router;
