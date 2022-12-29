const { Schema, model } = require('mongoose');

const {ANALYZE} = require("../config/constants");

const orderSchema = new Schema({
    month: {
        type: String,
        required: true
    },
    summa:{
        type: String,
        required: true
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(ANALYZE, orderSchema);
