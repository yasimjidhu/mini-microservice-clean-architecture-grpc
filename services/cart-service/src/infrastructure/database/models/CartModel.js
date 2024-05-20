const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Types.ObjectId,
        ref:'products',
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    price:{
        type:Number,
        required:true
    }
},{_id:false})

// cart schema 
const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'Users',
        required:true
    },
    items:[cartItemSchema],
})

const cart = mongoose.model('cart',cartSchema)
module.exports = cart