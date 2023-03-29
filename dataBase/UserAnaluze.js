const {Schema, model} = require('mongoose');

const {USERS_ANALYZE} = require("../config/constants");

const orderSchema = new Schema({
    count: {
        type: Number,
    },
    month: {
        type: String,
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model(USERS_ANALYZE, orderSchema);
