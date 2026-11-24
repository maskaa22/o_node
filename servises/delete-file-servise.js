const fs = require("fs");
const path = require("path");

const {STATIC} = require("../config/constants");

module.exports = {
    deleteFile(fileName) {
        const pathFile = path.resolve(__dirname, '..', STATIC, fileName);

        try {
            fs.unlinkSync(pathFile);
        } catch (e) {
            if (e.code !== 'ENOENT') {
                throw e;
            }
        }
    }
};
