const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        ref:'category' 
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
})

const products = mongoose.model('products',productsSchema)
module.exports = products