const router = require('express').Router();

const { userConttoller } = require('../controlles');
const { userMiddleware, authMiddleware } = require('../middleware');

router.get('/',
    authMiddleware. checkAccessToken,
    userConttoller.getAllUsers);

router.get('/:user_id',
    userConttoller.getSingleUsers);

router.post('/',
    //userMiddleware.validateUserBody,
    //userMiddleware.isEmptyFields,
    userMiddleware.checkUniqueEmail,
    userMiddleware.checkUniqueUsername,
    //userMiddleware.checkPassword,
    userConttoller.createUser);

router.patch('/',
    //userMiddleware.validateUserBody,
    //userMiddleware.isEmptyFields,
    userMiddleware.isUserPresent,
    userMiddleware.checkUniqueEmail,
    userMiddleware.checkPassword,
    userConttoller.updateUser);

router.delete('/', userMiddleware.isUserPresent, userConttoller.deleteUser);

module.exports = router;
