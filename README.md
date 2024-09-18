# Store Products API

A RESTful API for creating and managing products in a store, with JWT-based authentication for secure access.

#### **BASE URL** - [https://backend-task-cpok.onrender.com/api/v1](https://backend-task-cpok.onrender.com/api/v1)

#### **POSTMAN DOCS** - [API Documentation on Postman](https://documenter.getpostman.com/view/36399546/2sAXqqcNbN#a856406c-037c-462d-a3e8-2f743d8e5fbe)

## API Endpoints

### Authentication

-   **POST** `/auth/register` - Register a new user
-   **POST** `/auth/login` - Login with user credentials

### Products

-   **POST** `/products` - Create a new product
-   **GET** `/products` - Retrieve all products
-   **GET** `/products/:id` - Retrieve a specific product by ID
-   **PATCH** `/products/:id` - Update an existing product
-   **DELETE** `/products/:id` - Delete a product

> **Note**: The `id` field for placing an order should be a valid product identifier (mongoDB Id).

## How to Test

1. **Login** with sample user credentials on Postman.
2. **Authorization**: API uses a Bearer Token.
3. **Post Product Data**: Use
4. **Retrieve Product Data**: Use `/products` and `/products/:id` to manage products.
5. **Delete Product Details**: Use `/products/:id` to delete specific product information.

## To Run Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/timilehin2000/backend-task
    cd backend-task
    ```

2. Ensure Docker is installed on your local machine.

3. Set up environment variables by creating a `.env` file based on `.env.example`.

4. Install dependencies:

    ```bash
    npm install
    ```

5. Run the application:

    ```bash
    npm run dev
    ```

6. Optionally, **Run with Docker**:
    - Build and run Docker containers:
        ```bash
        docker-compose up --build
        ```
    - To stop and remove Docker containers:
        ```bash
        docker-compose down
        ```
7. To run tests:

    ```bash
    npm test
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
