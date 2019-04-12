# Product API

A simple product CRUD API for interfacing with a MongoDB database.

Uses the following schema:

````JavaScript
const productModel = new Schema({
    partNumber: { type: String },
    description: { type: String },
    price: {type: Number},
    imageURL: {type: String}
});
