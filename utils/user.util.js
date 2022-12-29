const {PASSWORD} = require("../config/constants");

module.exports = {
    userNormalizator: (userToNormalize) => {

        const fileldsToRemove = [PASSWORD];

        fileldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    },
    userNormalizatorForAuth: (userToNormalize) => {

        const fileldsToRemove = [PASSWORD];

        if (userToNormalize) {

            userToNormalize = userToNormalize.toJSON();

            fileldsToRemove.forEach((field) => {
                delete userToNormalize.user_id[field];
            });

            return userToNormalize;
        }
    },
};
