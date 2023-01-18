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
    price: {
        type: String,
        required: true
    },
    img: {
        type: String,
        // allowNull: false
    },
    category_id: {
        type: Schema.Types.ObjectId,
        // required: true, // нужно обязательно
        ref: CATEGORY
    },
    count: {
        type: String,
        // required: true
    },
    totalPrice: {
        type: String,
        // required: true
    },
    inventoryNumber: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

productSchema.plugin(mongoosePagination);

module.exports = model(PRODUCT, productSchema);
