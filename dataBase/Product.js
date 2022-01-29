const { Schema, model } = require('mongoose');



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    }

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });



module.exports = model('product', userSchema);
