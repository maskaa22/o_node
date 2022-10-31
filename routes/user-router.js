const router = require('express').Router();

const {userConttoller} = require('../controlles');
const {userMiddleware, authMiddleware} = require('../middleware');
const {constantsConfig} = require("../config");

router.get(constantsConfig.THIS,
    authMiddleware.checkAccessToken,
    userConttoller.getAllUsers);

router.patch(constantsConfig.THIS,
    userMiddleware.checkAllData,
    userMiddleware.updateContactDataMiddleware,
    userMiddleware.updateAdressDataMiddleware,
    userConttoller.updateAllData);

router.patch(constantsConfig.CONTACT,
    userMiddleware.checkContactData,
    userMiddleware.updateContactDataMiddleware,
    userConttoller.updateData);

router.patch(constantsConfig.ADRESS,
    userMiddleware.checkAdressData,
    userMiddleware.updateAdressDataMiddleware,
    userConttoller.updateData);

router.post(constantsConfig.SEND,
    // userMiddleware.checkAdressData,
    // userMiddleware.updateAdressDataMiddleware,
    userConttoller.sendUser);


// router.get('/:user_id',
//     userConttoller.getSingleUsers);
//
// router.patch('/',
//
//     userMiddleware.isUserPresent,
//     userMiddleware.checkUniqueEmail,
//     userMiddleware.checkPassword,
//     userConttoller.updateUser);

 // router.delete('/', userMiddleware.isUserPresent, userConttoller.deleteUser);

module.exports = router;
