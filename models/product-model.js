
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModel = new Schema({
    partNumber: { type: String },
    description: { type: String },
    price: {type: Number},
    imageURL: {type: String}
});

module.exports = mongoose.model('Product', productModel);