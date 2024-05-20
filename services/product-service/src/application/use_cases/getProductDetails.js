async function getProduct(productRepository,productId){
    return await productRepository.findById(productId)
}

module.exports = {getProduct}