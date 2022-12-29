const {Schema, model} = require('mongoose');

const {CALENDAR} = require("../config/constants");

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
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model(CALENDAR, orderSchema);
