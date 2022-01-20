module.exports = {
    userNormalizator: (userToNormalize) => {
        const fileldsToRemove = ['password'];

        //userToNormalize = userToNormalize.toJSON();

        fileldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};
