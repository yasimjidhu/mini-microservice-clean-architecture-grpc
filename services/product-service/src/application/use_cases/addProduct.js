const {createProduct} = require('../../domain/entities/product')


async function addProduct(productRepository,productData){
    const product = createProduct(null,productData.productName,productData.category,productData.price,productData.stock)
    return await productRepository.save(product)
}

module.exports = {addProduct}