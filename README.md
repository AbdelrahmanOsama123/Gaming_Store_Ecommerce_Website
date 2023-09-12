# Gaming_Store_Ecommerce_Website

## Getting Started

This repo contains a basic Node and Express app to get I started in constructing an API. To get started, clone this repo and run `yarn` in Ir terminal at the project root.

## Required Technologies
my application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- type script
  
## Steps to Completion

### 1. Plan to Meet Requirements

- I Design the Postgres database tables. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: I can format this however I like but these types of information should be provided

### 2.  DB Creation and Migrations

Now that I have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup Ir Postgres database. If I get stuck, I can always revisit the database lesson for a reminder. 

I must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in Ir application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints I create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality. Make sure that JWTs are required.

### 6. QA and `README.md`

Before submitting, make sure that Ir project is complete with a `README.md`. Ir `README.md` must include instructions for setting up and running Ir project including how I setup, run, and connect to Ir database. 

Before submitting Ir project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
