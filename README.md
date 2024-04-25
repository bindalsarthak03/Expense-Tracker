# Expense Tracker API

Expense Tracker is an API built with Node.js and Express that allows users to manage their income and expenses. It provides endpoints for user authentication, managing income transactions, and managing expense transactions.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with JWT (JSON Web Tokens).
- Secure password storage using bcrypt hashing.
- CRUD operations for managing income transactions.
- CRUD operations for managing expense transactions.
- Integrated Google oAuth2.0 authentication 

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine.
- MongoDB installed and running locally or a MongoDB Atlas account.

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/expense-tracker-api.git
2. Navigate to the project directory
   ```bash
   cd expense-tracker-api
3. Install dependencies
   ```bash
   npm install
4. Set up environment variables
   - Create a '.env' file in the root directory
   - Define the following variables in the '.env' file:
     ```bash
      PORT=5000
      MONGODB_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
5. Run the application
   ```bash
   npm start
 
 ## Usage
 Once the server is running, you can use tools like Postman or curl to interact with the API endpoints. Ensure 
 you have proper authentication tokens for protected routes.

 ## Endpoints
 The following endpoints are available:
 - POST /api/v1/register: Register a new user.
 - POST /api/v1/login: Log in user and generate JWT token.
 - POST /api/v1/signout: Log out user.
 - POST /api/v1/add-income: Add a new income transaction.
 - GET /api/v1/get-incomes: Get all income transactions.
 - DELETE /api/v1/delete-income/:id: Delete a specific income transaction.
 - POST /api/v1/add-expense: Add a new expense transaction.
 - GET /api/v1/get-expenses: Get all expense transactions.
 - DELETE /api/v1/delete-expense/:id: Delete a specific expense transaction.

## Database Schema and References

### User Schema

The `User` schema represents a user in the Expense Tracker application. It contains the following fields:

- `email`: Email address of the user.
- `password`: Hashed password of the user.
- `name`: Name of the user.
- `incomes`: An array of references to income transactions associated with the user.
- `expenses`: An array of references to expense transactions associated with the user.

### Income Schema

The `Income` schema represents an income transaction in the Expense Tracker application. It contains the following fields:

- `title`: Title of the income transaction.
- `amount`: Amount of the income transaction.
- `type`: Type of transaction (default: 'income').
- `date`: Date of the income transaction.
- `category`: Category of the income transaction.
- `description`: Description of the income transaction.
- `user`: A reference to the `User` schema, indicating the user who owns the income transaction.

### Expense Schema

The `Expense` schema represents an expense transaction in the Expense Tracker application. It contains the following fields:

- `title`: Title of the expense transaction.
- `amount`: Amount of the expense transaction.
- `type`: Type of transaction (default: 'expense').
- `date`: Date of the expense transaction.
- `category`: Category of the expense transaction.
- `description`: Description of the expense transaction.
- `user`: A reference to the `User` schema, indicating the user who owns the expense transaction.

The use of references (`user`) in the `Income` and `Expense` schemas establishes a relationship between these transactions and the corresponding user. This allows for efficient querying and retrieval of transactions associated with a specific user.


## Technologies Used
- Node.js
- Express.js
- MongoDB
- JWT(JSON WEB TOKEN)
- Bcrypt
## Future Enahncements
In the future, the Expense Tracker API will undergo the following enhancements:

- **Improved API Testing and Documentation**: Continuing to enhance the Swagger UI for better API testing and 
  documentation. This includes refining existing endpoints documentation and adding new endpoints as the API 
  evolves.

- **Hosting on a Dedicated Server**: Migrating the Expense Tracker API to a dedicated server for improved performance and reliability. This will ensure seamless access to the API for users and developers alike.
 




    
