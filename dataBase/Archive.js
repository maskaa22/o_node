
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
    cart:  {},
    status: {
        type: String,
        required: true
    },
    summa: {
        type: String,
        required: true
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('archive', orderSchema);
