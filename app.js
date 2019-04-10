'use-strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRouter = require('./router/product-router')();

const port = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://localhost/ProductAPI');

app.get('/', (request, response) => {
    response.send('Welcome to the Product Nodemon API');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', productRouter)

app.server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});