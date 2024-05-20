const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const connectDB = require('../database/db');
const {
    addToCartHandler,
    removeFromCartHandler,
    getUserCartProductsHandler,
} = require('../../presentation/controllers/cartController');

require('dotenv').config();



const PROTO_PATH = './src/infrastructure/proto/cart.proto'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const cartProto = grpc.loadPackageDefinition(packageDefinition).cart;


// Start the gRPC server
function main() {

    connectDB();

    const server = new grpc.Server();
    server.addService(cartProto.CartService.service, {
        AddToCart: addToCartHandler,
        RemoveFromCart: removeFromCartHandler,
        GetUserCartProducts: getUserCartProductsHandler,
    });

    const PORT =  '50053';
    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error('Server bind error:', err);
        } else {
            console.log(`Server running at http://0.0.0.0:${PORT}`);
            server.start();
        }
    });
}

main();
