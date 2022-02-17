const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    // category: {
    //     type: String,
    //     required: true
    // },
    // image: {
    //     type: String,
    //     required: true
    // }
    category_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('product', userSchema);
