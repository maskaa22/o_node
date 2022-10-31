// const { Schema, model } = require('mongoose');
//
// const orderSchema = new Schema({
//     user_id: {
//         type: Schema.Types.ObjectId,
//         required: true,
//         ref: 'user'
//     },
//     check: {
//         inventNumCheck: { type: String },
//         countCheck: { type: String }
//     },
//     summa: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         required: true
//     },
// }, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });
//
// module.exports = model('order', orderSchema);

const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    user_name:{
        type: String,
        required: true
    },
    surname: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    nameSity: {
        type: String,
        trim: true
    },
    nameDepartment: {
        type: String,
        trim: true
    },
    pay: {
        type: String,
        trim: true
    },
    cart:  {},
    status: {
        type: String,
        required: true
    },
    summa: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('order', orderSchema);
