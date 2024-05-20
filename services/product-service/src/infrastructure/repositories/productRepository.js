const ProductModel = require('../database/models/ProductModel')


async function save(product){
    const productModel = new ProductModel(product)
    await productModel.save()
    return productModel.toObject()
}

async function findAll(){
    const products = await ProductModel.find()
    return products.map(product => product.toObject())
}

async function findById(productId){
    const product = await ProductModel.findById(productId)
    return product ? product.toObject() : null
}


module.exports = {save,findAll,findById}