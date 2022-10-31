const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hash) => {
        const isPasswordMatced = await bcrypt.compare(password, hash);

        if (!isPasswordMatced) {
            //throw new Error('Не правильний пароль');
            return isPasswordMatced;
        }
        return isPasswordMatced;
    }
};
