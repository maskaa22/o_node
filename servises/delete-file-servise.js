const fs = require("fs");
const path = require("path");

const {STATIC} = require("../config/constants");

module.exports = {
    deleteFile(fileName) {
        const pathFile = path.resolve(__dirname, '..', STATIC, fileName);

        fs.unlinkSync(pathFile);
    }
};
