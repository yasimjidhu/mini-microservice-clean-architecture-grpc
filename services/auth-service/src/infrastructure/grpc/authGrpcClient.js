const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = '../proto/auth.proto'
const path = require('path')

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const authProto = grpc.loadPackageDefinition(packageDefinition).auth;

function createAuthGrpcClient(){
    const client = new authProto.AuthService('localhost:50051', grpc.credentials.createInsecure());
    return client
}

module.exports = {createAuthGrpcClient};