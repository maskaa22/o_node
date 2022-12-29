const {Schema, model} = require('mongoose');

const {O_AUTH} = require("../config/constants");
const {USER} = require("../config/user-roles-enum");

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, {timestamps: true});

module.exports = model(O_AUTH, oAuthSchema);
