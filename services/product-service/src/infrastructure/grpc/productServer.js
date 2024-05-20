const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const {addProduct} = require('../../application/use_cases/addProduct')
const {getAllProducts} = require('../../application/use_cases/getAllProducts')
const {getProduct} = require('../../application/use_cases/getProductDetails')
const connectDB = require('../database/db');
const {findAll,findById,save} = require('../repositories/productRepository'); // Ensure this is implemented to handle product data

const PROTO_PATH = './src/infrastructure/proto/product.proto'

const packageDefinition = protoLoader.loadSync(PROTO_PATH,{
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const productProto = grpc.loadPackageDefinition(packageDefinition).products;


const productRepository = {save,findById,findAll}

async function main(){

    connectDB();
    
    const server = new grpc.Server();
    
    server.addService(productProto.ProductsService.service, {
      AddProduct: async (call, callback) => {

        const { productName, category, price, stock } = call.request;
        const productData = { productName, category, price, stock }

        try {
          const newProduct = await addProduct(productRepository,productData);
          callback(null, { message: 'Product added successfully' });
        } catch (error) {
          callback({
            code: grpc.status.INTERNAL,
            message: error.message,
          });
        }
      },

      GetAllProducts: async (call, callback) => {
        try {
          const products = await getAllProducts(productRepository);
          callback(null, { products });
        } catch (error) {
          callback({
            code: grpc.status.INTERNAL,
            message: error.message,
          });
        }
      },
      GetSingleProduct: async (call, callback) => {
        const { id } = call.request;
        try {
          const product = await getProduct(productRepository,id);
          callback(null, product);
        } catch (error) {
          callback({
            code: grpc.status.INTERNAL,
            message: error.message,
          });
        }
      },
    });
    

    server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), (err, port) => {
      if (err) {
        console.error('Server bind error:', err);
      } else {
        console.log('Server running at http://0.0.0.0:50052');
        server.start();
      }
    });
}

main()