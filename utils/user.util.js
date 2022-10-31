module.exports = {
    userNormalizator: (userToNormalize) => {

        const fileldsToRemove = ['password'];

        fileldsToRemove.forEach((field) => {

            delete userToNormalize[field];
        });

        return userToNormalize;
    },
    userNormalizatorForAuth: (userToNormalize) => {

        const fileldsToRemove = ['password'];

        if (userToNormalize) {

            userToNormalize = userToNormalize.toJSON();

            fileldsToRemove.forEach((field) => {

                delete userToNormalize.user_id[field];
            });
            return userToNormalize;

        }
    },
};
