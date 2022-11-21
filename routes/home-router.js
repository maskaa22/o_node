const router = require('express').Router();

const { homeController } = require('../controlles');
const {constantsConfig} = require("../config");

router.post(constantsConfig.THIS,
    homeController.createCalendarEvent);

router.get(constantsConfig.THIS,
    homeController.getCalendarEvent);

router.get(constantsConfig.FIND,
    homeController.getFindEvent);

module.exports = router;
