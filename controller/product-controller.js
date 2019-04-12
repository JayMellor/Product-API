
"use-strict";

const Product = require('../models/product-model');
const httpStatus = require('http-status');

const addProduct = (request, response) => {

    if (!request.body.partNumber || request.body.partNumber === '') {
        return response.status(httpStatus.BAD_REQUEST).send('Part number required');
    }
    if (!request.body.description || request.body.description === '') {
        return response.status(httpStatus.BAD_REQUEST).send('Description required');
    }
    if (!request.body.price) {
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
const findProductById = (request, response, next) => {
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
    });

};

const getProduct = (request, response) => {
    return response.status(httpStatus.OK).json(request.product);

};

const updateProduct = (request, response) => {

    const { product } = request;

    product.partNumber = request.body.partNumber;
    product.description = request.body.description;
    product.price = request.body.price;

    return request.product.save((error) => {
        if (error) {
            return response.send(error);
        }
        return response.json(product);
    });

};

const deleteProduct = (request, response) => {
    request.product.remove((error) => {
        if (error) {
            return response.send(error);
        }
        return response.sendStatus(httpStatus.NO_CONTENT);
    })
};

module.exports = { addProduct, getProducts, findProductById, getProduct, updateProduct, deleteProduct };