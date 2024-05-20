const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')
const cartProtoPath = '../proto/cart.proto'
const packageDefinition = protoLoader.loadSync(cartProtoPath,{
    keepCase:true,
    longs:String,
    enums:String,
    defaults:true,
    oneofs:true
})

const cartProto = grpc.loadPackageDefinition(packageDefinition).cart

const client = new cartProto.CartService('localhost:50053',grpc.credentials.createInsecure())

module.exports = client;