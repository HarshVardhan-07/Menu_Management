**Menu Management**


This project is a RESTful API built with Express.js and Mongoose for managing categories, subcategories, and items. Each category can have multiple subcategories and items, and each subcategory can have multiple items.

## Features

- Create, read, update, and delete categories.
- Create, read, update, and delete subcategories under a specific category.
- Create, read, update, and delete items under a specific subcategory and category.
- Fetch categories by ID or name.
- Fetch all subcategories under a specific category.
- Fetch all items under a specific subcategory.

## Technologies Used

- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- dotenv (for environment variables)
- method-override (for supporting PUT and DELETE in forms)
- MongoDB

## Prerequisites

- Node.js installed
- MongoDB installed and running

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/HarshVardhan-07/Menu_Management.git
    cd Menu_Management
    ```

2. Install the dependencies:
    ```bash
    npm i package.json
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGO_URI=mongodb://localhost:27017/menu_management
    ```

4. Start the server:
    ```bash
    npm start
    ```
## Usage

Describe how to use your project.

## API Documentation

### Categories

- **Create Category**
    ```http
    POST /api/categories
    ```
    Request Body:
    ```json
    {
        "name": "Electronics",
        "image": "https://example.com/electronics.jpg",
        "description": "Category for electronics products",
        "taxApplicability": true,
        "tax": 10.5,
        "taxType": "VAT"
    }
    ```

- **Get All Categories**
    ```http
    GET /api/categories
    ```

- **Get Category by ID**
    ```http
    GET /api/categories/:categoryId
    ```

- **Get Category by ID or Name**
    ```http
    GET /api/categories/search?id=categoryId
    ```
    or
    ```http
    GET /api/categories/search?name=categoryName
    ```

- **Update Category**
    ```http
    PUT /api/categories/:categoryId
    ```

- **Delete Category**
    ```http
    DELETE /api/categories/:categoryId
    ```

### Subcategories

- **Create Subcategory**
    ```http
    POST /api/categories/:categoryId/subcategories
    ```
    Request Body:
    ```json
    {
        "name": "Mobile Phones",
        "image": "https://example.com/mobile-phones.jpg",
        "description": "Subcategory for mobile phones"
    }
    ```

- **Get All Subcategories under a Category**
    ```http
    GET /api/categories/:categoryId/subcategories
    ```

- **Update Subcategory**
    ```http
    PUT /api/categories/:categoryId/subcategories/:subcategoryId
    ```

- **Delete Subcategory**
    ```http
    DELETE /api/categories/:categoryId/subcategories/:subcategoryId
    ```

### Items

- **Create Item**
    ```http
    POST /api/categories/:categoryId/subcategories/:subcategoryId/items
    ```
    Request Body:
    ```json
    {
        "name": "iPhone 12",
        "image": "https://example.com/iphone12.jpg",
        "description": "Latest Apple iPhone 12",
        "taxApplicability": true,
        "tax": 5,
        "baseAmount": 999,
        "discount": 100
    }
    ```

- **Get All Items under a Subcategory**
    ```http
    GET /api/categories/:categoryId/subcategories/:subcategoryId/items
    ```

- **Update Item**
    ```http
    PUT /api/categories/:categoryId/subcategories/:subcategoryId/items/:itemId
    ```

- **Delete Item**
    ```http
    DELETE /api/categories/:categoryId/subcategories/:subcategoryId/items/:itemId
    ```

- **Search Item by Name or ID**
    ```http
    GET /api/items/search?id=itemId
    ```
    or
    ```http
    GET /api/items/search?name=itemName
    ```





