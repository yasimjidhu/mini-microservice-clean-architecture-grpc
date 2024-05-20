const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const connectDB = require('../database/db')

const { save, findByEmail } = require('../repositories/userRepository')

const PROTO_PATH = '../../services/auth-service/src/infrastructure/proto/auth.proto'
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const authProto = grpc.loadPackageDefinition(packageDefinition).auth;

const userRepository = { save, findByEmail }

async function main() {

    connectDB()

    const server = new grpc.Server();
    server.addService(authProto.AuthService.service, {
        signup: async (call, callback) => {
            console.log('signup request reached in auth server', call.request)
            try {
                const userData = call.request;
                const newUser = await signupUser(userRepository, userData);
                callback(null, { message: 'User registered successfully', userId: newUser._id });
            } catch (error) {
                callback({
                    code: grpc.status.INTERNAL,
                    message: error.message,
                });
            }
        },
        login: async (call, callback) => {
            try {
                console.log('login reached in grpc server', call.request)
                const userData = call.request;
                const { token, user } = await loginUser(userRepository, userData.email);
                callback(null, { token, user });
            } catch (error) {
                callback({
                    code: grpc.status.INTERNAL,
                    message: error.message
                });
            }
        }
    });

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error('Server bind error:', err);
        } else {
            console.log('Server running at http://0.0.0.0:50051');
            server.start();
        }
    });
}

main();
