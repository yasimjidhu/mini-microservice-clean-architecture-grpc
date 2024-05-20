const {addProduct} = require('../../application/use_cases/addProduct')
const {getAllProducts} = require('../../application/use_cases/getAllProducts')
const {getProduct} = require('../../application/use_cases/getProductDetails')


function createProductController(productRepository){
    async function add(req,res){
        try {
            const product = await addProduct(productRepository,req.body)
            res.json(product)
        } catch (error) {
            res.status(400).send(error.message)
        }        
    }

    async function getAll(req,res){
        try{
            const products = await getAllProducts(productRepository)
            res.json(products)
        }catch(err){
            res.status(400).send(err.message)
        }
    }

    async function getSingle(req,res){
        try {
            const productId = req.params.productId
            const product = await getProduct(productRepository,productId)
            res.json(product)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }


    return {add,getAll,getSingle}
}

module.exports = {createProductController}