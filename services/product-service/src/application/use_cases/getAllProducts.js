async function getAllProducts(productRepository){
    return await productRepository.findAll()
}

module.exports = {getAllProducts}