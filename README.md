# Cookauth
Simple user authentication API

## Capabilities

- Create users with **username, password, email** 
- Login users with **username** and **password**
- Verify if a cookie is valid
- Get email of users

## API Enpoints

First, you need to set up two .env variables

- **MONGO_URI** : URI of your MongoDB cluster
- **SECRET**: Secret key, this will be used to encrypt cookies 

```js
POST /user 
//body: {email: "", password: "", username: ""}

//response -> cookie with an encrypted payload that contains username and password of current user || ERROR: User Already Exists

POST /login
//body: {username: "", password: ""}

//response -> cookie with an encrypted payload that contains username and password of current user|| Error: Invalid Credentials || Error: User Does Not Exists

GET /isActive
//headers: Cookie: [cookauth_user=<value>]

//response -> OK || Error: Invalid Credentials || Error: Invalid Cookie

GET /email
//headers: Cookie: [cookauth_user=<value>]

//response -> <email> || Error: Invalid Credentials || Error: Incalid Cookie 
``````