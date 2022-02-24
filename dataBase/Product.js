const mongoosePagination = require('mongoose-paginate');

const { Schema, model } = require('mongoose');

const productSchema = new Schema({
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

productSchema.plugin(mongoosePagination);

module.exports = model('product', productSchema);


