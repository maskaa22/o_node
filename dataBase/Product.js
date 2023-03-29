const mongoosePagination = require('mongoose-paginate');
const {Schema, model} = require('mongoose');

const {CATEGORY, PRODUCT} = require("../config/constants");

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: CATEGORY
    },
    count: {
        type: String,
    },
    totalPrice: {
        type: String,
    },
    inventoryNumber: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

productSchema.plugin(mongoosePagination);

module.exports = model(PRODUCT, productSchema);
