const {Schema, model} = require('mongoose');

const {CALENDAR} = require("../config/constants");
const {USER} = require("../config/user-roles-enum");

const orderSchema = new Schema({
    title: {
        type: String,
    },
    date: {
        type: String,
    },
    description: {
        type: String,
    },
    time: {
        type: String,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model(CALENDAR, orderSchema);
