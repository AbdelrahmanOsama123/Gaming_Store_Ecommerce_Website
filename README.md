# FULL STACK WEB PROJECT

## Getting Started

- This is LUGX STORE fullstack web application, this app is responsive design, it implements node, typeScript, postgreSQL, jasmine and ejs.
- The app has normal users and admins, when user signup he recieves confirmation email.
- The user can sign in with google account.
- The user can change his profile image.
- Admin can add products to the store using admin dashboard.
- This app sells games products, user can add game product to cart and place the order, then he will recieve email of the bill.
- User can see this current orders and completed orders from profile
- User can send message to the support team in contact-us.
```bash
https://drive.google.com/file/d/198PEaNpF93_dsQgnXrUixAYP7vbnEJaL/view?usp=sharing
```

![2](https://github.com/AbdelrahmanOsama123/Gaming_Store_Ecommerce_Website/blob/main/FrontEnd/assets/images/login.png)

![1](https://github.com/mohamedamr241/CEE-STORE/assets/81832292/62ede9df-8d95-4130-951e-f149a9f1e7af)

## Technologies used

My application use the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- cors for security
- Access token and refresh token for user signing in
- passport-google-oauth20 for signing in with google account
- multer for adding images of products and user profile image
- ejs template engine to handle front end
- nodemailer for sending email when user signup, place order and sending messages
- winston for handling logs of the server and the database

### Installing

Run this command for dependency managment
```bash
npm i
```

-To run server
```bash
npm run start
```
-To build the project
```bash
npm run build
```
-To run test
```bash
npm run test
```

### The environment

- We start first by installing pg and dotenv using npm and then creating .env file to put in it all the senstive information to be hidden and including .env in .gitignore.
```bash
POSTGRES_HOST
POSTGRES_DB
POSTGRES_DB_TEST
DB_PASSWORD
DB_USERNAME
ENV=dev
PEPPER
SALT_ROUND
TOKEN_SECRET
REFRESH_TOKEN
EMAIL
EMAIL_PASSWORD
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

## Setup and connect to the database

- Installing Pool
```bash
npm i Pool
```
- Create two databases: first: production , second: testing 
```bash
CREATE DATABASE (databasename)
```
- Download db-migrate package
```bash
npm i db-migrate
```
- Then run migrations
```bash
db-migrate env dev up
```

- First we import all the senstive data from .env file like host, database name, user and env state, then we create client using pool package (npm i Pool) -> let client: Pool = new Pool();
  and then by checking that ENV variable is dev for developer or test for testing and then create a connection with the database by assigning to the client:Pool host,database,user,password of the database which are determined in database.json

  ```json
  {
    "dev": {
      "driver": "pg",
      "host": {
        "ENV": "POSTGRES_HOST"
      },
      "database": {
        "ENV": "POSTGRES_DB"
      },
      "user": {
        "ENV": "POSTGRES_USER"
      },
      "password": {
        "ENV": "POSTGRES_PASSWORD"
      }
    },
    "test": {
      "driver": "pg",
      "host": {
        "ENV": "POSTGRES_HOST"
      },
      "database": {
        "ENV": "POSTGRES_TEST_DB"
      },
      "user": {
        "ENV": "POSTGRES_USER"
      },
      "password": {
        "ENV": "POSTGRES_PASSWORD"
      }
    }
  }
  ```

  - We have two databases: production this is for development and can be connected by running npm run start and production and testing is for testing and can be connected to by running npm run test.

  - As we see here there is a development database and testing database if you are running the server using npm run start development database will be connected but if you run npm run test then testing database will be connected.

  - After connecting to the database you should run the migration up (db-migrate up) to create the tables in the database.

By following this steps you have successfully connected to the database for development or for testing and the next step is creating your tables and migrating them in the database or run the tests (testing with jasmine).

## Ports

- Port in which the server is running on: 8000
- Port of the database is in .env file hidden which is:5432

```bash
#.env
DB_PORT=5432
PORT=8000
```

## REDIS

- This app use redis for storing some user data so you should first go and install redis from this link 
```bash
https://github.com/microsoftarchive/redis/releases
```
- Install redis package
```bash
npm i redis
```

- Add this code for configuration of redis
```bash
import { createClient } from 'redis';
const redisClient = createClient();

redisClient.on('error', err => console.log('Redis Client Error', err));

const conn = async()=>{
    await redisClient.connect();
}
```
## IMAGE DEMO
- Products

![3](https://github.com/mohamedamr241/CEE-STORE/assets/81832292/742b831f-664a-48d0-954a-41b75edfd4d5)

- Cart
  
![4](https://github.com/mohamedamr241/CEE-STORE/assets/81832292/03a1f450-7971-4ec9-b7b1-c9f9f48cb8ee)

- Profile
  
![5](https://github.com/mohamedamr241/CEE-STORE/assets/81832292/6e5a791d-d961-49c9-a62d-3f1072d51de5)

- Contact Us
  
![6](https://github.com/mohamedamr241/CEE-STORE/assets/81832292/77c04286-c2f8-44ca-a5fb-21b19d886f6d)

- Admin add product
  
![7](https://github.com/mohamedamr241/CEE-STORE/assets/81832292/1821f670-b258-413a-a351-1f5d70395c0f)
