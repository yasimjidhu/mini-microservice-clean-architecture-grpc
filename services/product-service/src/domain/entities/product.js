function createProduct(id,productName,category,price,stock){
    return {
        id,
        productName,
        category,
        price,
        stock
    }
}

module.exports = {createProduct}