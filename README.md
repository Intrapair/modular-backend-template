# Modular Backend Template powered by ExpressJS
This is a modular backend template powered by Express & Typescript. It is designed to be used with any type of database (SQL & NoSQL), simply plug in your favorite ORM or Query build and you are good to go :smile:

## Requirements
- NodeJS runtime
- PNPM or any other package manager (Yarn or NPM)
- MariaDB or MongoDB or any other database you prefer
- Redis connection (for BullMQ & Cache) or you can remove it if you don't need it

## Features
- Completely written in [Typescript](https://typescriptlang.org/)
- [Express](https://expressjs.com/) Nodejs framework
- [ExpressValidator](https://express-validator.github.io/docs) validate and sanitize express request
- [Jest](https://jestjs.io) and [Supertest](https://www.npmjs.com/package/supertest) for automated test
- [BullMQ](https://docs.bullmq.io/) Redis-based distributed queue for Node
- [AWS S3](https://aws.amazon.com/s3/) File upload to AWS S3 bucket (you can remove if you don't need it)
- [Multer](https://github.com/expressjs/multer#readme) Node.js middleware for handling multipart/form-data
- [Pino](https://getpino.io/) for logging
- [Axiom](https://axiom.co/) Transporter for Pino (you can remove if you don't need it and don't forget to update your pino config if you remove this)

## Project File Structure
- `src` - All source code
  - `__tests__` - Unit test files
  - `config` - Configuration files
  - `controllers` - Controllers responsible for handling requests and business logic (Use Cases)
  - `middlewares` - Middlewares for validation, authentication, authorization, etc. (Interface Adapters)
  - `migration` - Database migration files
  - `models` - Database models (Entities)
  - `repositories` - Repositories or data access layer (Entities)
  - `routes` - API endpoints (Interface Adapters)
  - `scripts` - Scripts for cron jobs or complex npm scripts
  - `services` - Services for interacting with other services or third-party APIs
  - `utils` - Utility functions (helper and library functions)
  - `types` - Custom types such as interfaces, enums, etc.
  - `app.ts` - Main application file (Framework and Drivers)
  - `index.ts` - Server file (entry point)

## Filename Convention
- All files should be in `camelCase` followed by the _singular_ folder name as then the file extension. Example: `user.model.ts` 
- All folders should be named in `camelCase`.

## How to install from source
- Clone the repository - `git clone repo-link`
- `cd project-folder`
- You need to have valid MariaDB database and Redis connection
- Install dependencies - `pnpm install`
- Setup environment variable - `cp .env.example .env`
- Run development server `pnpm dev`
- Run test suite `pnpm test`
- Run production server `pnpm start`

## Using docker
- Clone the repository - `git clone repo-link`
- `cd project-folder`
- Setup environment variable - `cp .env.example .env`
- Start docker container - `docker-compose up -d`
- Run test suite `docker exec -it container-id yarn start`

## Format code with Prettier
- After writing code, you can format it with Prettier using `pnpm format`
- You can update your prettier config in `.prettierrc` file, the default setting uses 4 spaces for indentation