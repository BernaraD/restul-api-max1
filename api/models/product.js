const mongoose = require('mongoose');

//creating a schema:
//1.Name of the schema, we pass to it JavaScript Object
//1. id with underscore by convention  2. type = mongoose 3.ObjectId - which is a special Id that mongoose uses internally
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    }
});

//we have to export it wrapped into the "model",
//schema is like a layout or sign of the object you want to use
//the model is then an object itself, or gives you a constructor to build such an object, that allows you build objects based on that schema
//___________________________________________________________________________________________________________________________________________
//Two arguments inside the mongoose.model
//1. Name of the model you want to use internally. Should be uppercase by convention
//2. Schema you want to use for that model
module.exports = mongoose.model('Product', productSchema);
