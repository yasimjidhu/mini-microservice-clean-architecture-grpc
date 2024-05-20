const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const authProtoPath = path.resolve(__dirname, 'proto/auth.proto');
const productProtoPath = path.resolve(__dirname, 'proto/product.proto');

// auth service client
const authPackageDefinition = protoLoader.loadSync(authProtoPath);
const authProto = grpc.loadPackageDefinition(authPackageDefinition).auth;
const authClient = new authProto.AuthService('localhost:50051', grpc.credentials.createInsecure());

// product service client
const productPackageDefinition = protoLoader.loadSync(productProtoPath);
const productProto = grpc.loadPackageDefinition(productPackageDefinition).products;
const productClient = new productProto.ProductsService('localhost:50052', grpc.credentials.createInsecure());

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/auth/signup', (req, res) => {
    console.log('Signup request reached in API gateway', req.body);
    authClient.signup(req.body, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.post('/auth/login', (req, res) => {
    console.log('Login request reached in API gateway', req.body);
    authClient.login(req.body, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.post('/products/add-product', (req, res) => {
    console.log('Add product request reached in API gateway', req.body);
    productClient.AddProduct(req.body, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.get('/products/get-all-products', (req, res) => {
    productClient.GetAllProducts({}, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.get('/products/get-single-product/:id', (req, res) => {
    const productId = { id: req.params.id };
    productClient.GetSingleProduct(productId, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(response);
        }
    });
});

app.listen(4000, () => {
    console.log('API Gateway running on port 4000');
});
