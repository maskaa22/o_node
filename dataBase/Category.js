const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    category_name: {
        type: String,
        required: true
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('category', userSchema);
