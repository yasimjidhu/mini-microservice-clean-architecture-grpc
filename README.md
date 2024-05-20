 welcome
### Services

- **API Gateway**: Handles requests and routes them to the appropriate microservice.
- **Auth Service**: Manages user authentication and authorization.
- **Product Service**: Manages product data and operations.
- **Cart Service**: Manages the shopping cart operations.

## Prerequisites

- Node.js
- Docker
- Kubernetes
- MongoDB

## Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yasimjidhu/mini-microservice-clean-architecture-grpc.git
    cd mini-microservice-clean-architecture-grpc
    ```

2. **Install dependencies** for each service:
    ```sh
    cd services/auth-service
    npm install
    cd ../api-gateway
    npm install
    cd ../product-service
    npm install
    cd ../cart-service
    npm install
    ```

3. **Set up environment variables** for each service by creating a `.env` file in each service directory (refer to `.env.example` if provided).

4. **Run services locally**:
    ```sh
    cd services/auth-service
    npm start
    cd ../api-gateway
    npm start
    cd ../product-service
    npm start
    cd ../cart-service
    npm start
    ```

## Dockerization

1. **Build Docker images**:
    ```sh
    docker build -t your-docker-username/auth-service:latest ./services/auth-service
    docker build -t your-docker-username/api-gateway:latest ./services/api-gateway
    docker build -t your-docker-username/product-service:latest ./services/product-service
    docker build -t your-docker-username/cart-service:latest ./services/cart-service
    ```

2. **Push Docker images**:
    ```sh
    docker push your-docker-username/auth-service:latest
    docker push your-docker-username/api-gateway:latest
    docker push your-docker-username/product-service:latest
    docker push your-docker-username/cart-service:latest
    ```

## Kubernetes Deployment

1. **Deploy services to Kubernetes**:
    ```sh
    kubectl apply -f ./services/api-gateway/deployment.yaml
    kubectl apply -f ./services/auth-service/deployment.yaml
    kubectl apply -f ./services/product-service/deployment.yaml
    kubectl apply -f ./services/cart-service/deployment.yaml
    ```

2. **Check the status of the deployments**:
    ```sh
    kubectl get pods
    ```

## CI/CD Pipeline

The CI/CD pipeline is configured using GitHub Actions, located in `.github/workflows/ci-cd.yml`.

### Steps

1. **On Push or Pull Request to Main Branch**:
    - Checkout the repository
    - Set up Docker Buildx
    - Log in to Docker Hub
    - Build and push Docker images for each service
    - Deploy to Kubernetes

### Secrets

Ensure the following secrets are set in your GitHub repository:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password

## Usage

Access  this application via the API Gateway URL provided by your Kubernetes service.


