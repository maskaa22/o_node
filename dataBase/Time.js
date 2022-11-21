const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    title: {
        type: String,
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('time', orderSchema);
