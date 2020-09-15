const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect(
    'mongodb+srv://node-shop:' +
    process.env.MONGO_ATLAS_PW +
    '@node-rest-shop.0nmsy.mongodb.net/?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    );

mongoose.Promise = global.Promise; // to get read of an error message in the console

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false})); // extract url encoded data, make it readable for me
app.use(bodyParser.json()); //extract json, makes it readable for me

//CORS- Cross-Origin-Resource Sharing
//for RESTful API we want to allow client access coming from different server
//to get data from a different server
//Restfull API are meant to be consumed to other clients and other servers
//We can disable this mechanism by sending some headers from the server to the client
//"It's ok, you can have access"
//We want to append a header, to any response we send back

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === "OPTIONS") {
        res.header (
            'Access-Control-Allow-Methods',
            "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
//we will block all our incoming request, unless we add 'next' method

    next();
});

//Routes which should handle requests:
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

//error handling middleware:
app.use((req, res, next) => {
    const error = new Error('Oops, page is not found');
    error.status = 404;
//executing "next" method, to pass and pass our error along with it
//this will forward the "error" request
    next(error);
})

//this will handle all kinds of errors from anywhere else in my application
//this will happened later, when we handle data base those applications might fail and will have status 500.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;