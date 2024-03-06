# API Development and Documentation

## Authentication App

Authentication service basically allows a user to create an account to the service, login to the service, and get their user data using access token. The application must:

1. Create User - ability to create a user by allowing them provide their user data and saving ion te database.
2. Login User - ability for user to login to the system using their login credentials.
3. User Profile - ability to get user profile information using the access token send to the user at logic.

## About the Stack

This is a backend application that was build with Nodejs and Express framework. It is designed with some key functional areas:

### Available Library/Framework Used

1. `Express`
2. `Mysql`
3. `Sequelize`
4. `JWT (Json Web Token)`
5. `bcryptjs`

## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm run dev`
### `npm start`

### API Documentation
The `Authentication-API-V1.postman_collection.json` file contains a complete documentation of the backend API's. The documentation explains how the api is called and the request send and JSON response received.
