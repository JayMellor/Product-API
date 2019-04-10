
"use-strict";

const Product = require('../models/product-model');
const httpStatus = require('http-status');

const verifyRequest = (request, options) => {

    let requestIsValid = true;

    Object.entries(request.body).forEach((item) => {
        const key = item[0];
        const value = item[1];

        const matchingKey = options.find((option) => option === key);

        if (!matchingKey) {
            requestIsValid = false;
        }
        if (!value) {
            requestIsValid = false;
        }

    });

    return requestIsValid;

}

const addProduct = (request, response) => {

    if (!request.body.partNumber || request.body.partNumber === ''){
        return response.status(httpStatus.BAD_REQUEST).send('Part number required');
    }
    if (!request.body.description || request.body.description === ''){
        return response.status(httpStatus.BAD_REQUEST).send('Description required');
    }
    if (!request.body.price){
        return response.status(httpStatus.BAD_REQUEST).send('Price required');
    }

    const product = new Product(request.body);

    product.save();
    response.status(httpStatus.CREATED);
    return response.json(product);

};

const getProducts = (request, response) => {
    Product.find((error, products) => {
        if (error) {
            return response.send(error);
        }
        return response.json(products);
    })
};

/**
 * Middleware function that searches for a product entry
 * @param {Object} request request object containing product ID 
 * @param {Object} response response object
 * @param {function} next next function that proceeds flow to
 * next function in the list
 */
const findProduct = (request, response, next) => {

    Product.findById(request.params.productId, (error, product) => {

        if (error) {
            return response.send(error);
        }
        if (product) {
            request.product = product;
            return next();
        }
        else {
            return response.sendStatus(httpStatus.NOT_FOUND);
        }
    })

};

const getProduct = (request, response) => {

    return response.status(httpStatus.OK).json(request.product);

};

const updateProduct = (request, response) => {

};

const deleteProduct = (request, response) => {

};

module.exports = { addProduct, getProducts, findProduct, getProduct, updateProduct, deleteProduct };