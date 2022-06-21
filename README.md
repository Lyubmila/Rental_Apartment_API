# Rental_Apartment_API

## Discription

A Rental Apartment API allows only authorized users can make some changes. User receive a Token at the header, with the Token the user receive an aaccess to create ad, find ad, update or delete ad.

### Technologies Used

NodeJS, Express, MongoDB, Mongoose, Postman, Helmet, Bcrypt, Validator, Json Web Token, HEROKU

### ENV Variables

* MONGODB_URI
* SECRET_KEY
* SALT

### Instructions on Installing & Running Locally

Clone the project. Open with VS Code and you have to install all dependencies. 

- npm init -y 
- npm i bcrypt
- npm i dotenv
- npm i express
- npm i helmet
- npm i jsonwebtoken
- npm i mongoose
- npm i morgan
- npm i express-validator

Use the comand "nodemon server.js" for running the app. 

### Endpoints, Parameters, Schema

Ads CRUD (./ads):

* Create Ad
* Read Ads
* Read Ad by id
* Update Ad
* Delete Ad

Users CRUD (./users):

* Create User
* Read Users
* Update User
* Delete User

 Auth (./auth):

 * Log in

Used 'Log in' function to verify user is logged to access to post, update, read or delete ads.

User Schema
- username: string, required
- email: string, required
- birthday: date, required
- age: number
- password: string, required
Ads Schema
- created_by: string, required
- created_at: date, required
- ad_title: string, required
- ad_content: string, required

authMiddleware: it takes token from the header and it is used to protect the ads router.

HEROKU is used for deployment this project https://dashboard.heroku.com/apps/apt-rent-app/