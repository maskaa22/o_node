const router = require('express').Router();

const {constantsConfig} = require("../config");
const {userConttoller} = require('../controlles');
const {userMiddleware, authMiddleware} = require('../middleware');

router.get(constantsConfig.THIS,
    authMiddleware.checkAccessToken,
    userConttoller.getAllUsers);

router.get(constantsConfig.FIND_FOTO_FOR_TOKEN,
    userConttoller.findIdUser);

router.patch(constantsConfig.ADRESS,
    userMiddleware.checkAdressData,
    userMiddleware.updateAdressDataMiddleware,
    userConttoller.updateData);

router.patch(constantsConfig.CONTACT,
    userMiddleware.checkContactData,
    userMiddleware.updateContactDataMiddleware,
    userConttoller.updateData);

router.patch(constantsConfig.THIS,
    userMiddleware.checkAllData,
    userMiddleware.updateContactDataMiddleware,
    userMiddleware.updateAdressDataMiddleware,
    userConttoller.updateAllData);

router.post(constantsConfig.SEND,
    userConttoller.sendUser);

router.post(constantsConfig.THIS,
    userConttoller.addFoto);

module.exports = router;
