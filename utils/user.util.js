const {PASSWORD, PASSWORD_TOO} = require("../config/constants");

module.exports = {
    userNormalizator: (userToNormalize) => {

        const fileldsToRemove = [PASSWORD, PASSWORD_TOO];

        fileldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    },
    userNormalizatorForAuth: (userToNormalize) => {

        const fileldsToRemove = [PASSWORD, PASSWORD_TOO];

        if (userToNormalize) {

            userToNormalize = userToNormalize.toJSON();

            fileldsToRemove.forEach((field) => {
                delete userToNormalize.user_id[field];
            });

            return userToNormalize;
        }
    },
};
