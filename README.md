# jwt-authenticator

A **JSON Web Token (JWT)** authentication API built with **Node.js** and
**TypeScript**.

## Technologies

In addition to **Node.js** and **TypeScript**, this project uses the following
libraries:

- **express** - Web server and routing.
- **express-validator** - Set of request data validation and sanitization
middlewares.
- **express-rate-limit** - Rate limiting middleware to prevent abuse attacks.
- **Helmet** - Security-related HTTP headers middleware to prevent common web
vulnerabilities.
- **Morgan** - HTTP request logging middleware.
- **jsonwebtoken** - JWT generation and validation.
- **argon2** - Secure password hashing using the Argon2 algorithm.
- **mongoose** - Object data modeling (ODM) for MongoDB.
- **redis** - In memory database.

## Features

- User registration.
- JWT-based authentication.
- Logout with JWT invalidation using Redis blacklist.

## Author

**João Victor**
