
const express = require('express');
const cors = require('cors');

const controller = require('../controller/product-controller');
const permittedOrigin = require('../common/permitted-origins');

module.exports = () => {

    const productRouter = express.Router();

    const options = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: permittedOrigin,
        preflightContinue: false
    };

    //use cors middleware
    productRouter.use(cors(options));

    productRouter.route('/products')
        .post(controller.addProduct)
        .get(controller.getProducts);

    productRouter.use('/products/:productId', controller.findProductById);

    productRouter.route('/products/:productId')
        .get(controller.getProduct)
        .put(controller.updateProduct)
        .delete(controller.deleteProduct);

    productRouter.options("*", cors(options));

    return productRouter;

};