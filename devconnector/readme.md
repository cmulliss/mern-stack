# Installation

- regular dependencies:
- npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request

- dev dependencies:
- npm i -D nodemon concurrently

## Summary of routes/api.users.js

- create the user
- hash the password
- save the user in the db
- get the payload, which included the user.id
- then we sign the token
- pass the payload
- pass in the secret expiration
- then, inside the callback, we will get either an error or we will get the token
- If we get the token, ie no error, we will send that token back to the client

## Create a mongoose models

- Have created our route files

* then create models folder and model files
*
