# Modular Backend Template powered by ExpressJS
This is a modular backend template powered by Express & Typescript. It is designed to be used with any type of database (SQL & NoSQL), simply plug in your favorite ORM or Query build and you are good to go :smile:

## Requirements
- NodeJS runtime
- NPM or Yarn package manager
- MariaDB or MongoDB or any other database you prefer
- Redis connection (for BullMQ) or you can remove it if you don't need it

## Features
- Completely written in [Typescript](https://typescriptlang.org/)
- [Express](https://expressjs.com/) Nodejs framework
- [ExpressValidator](https://express-validator.github.io/docs) validate and sanitize express request
- [Jest](https://jestjs.io) and [Supertest](https://www.npmjs.com/package/supertest) for automated test
- [BullMQ](https://docs.bullmq.io/) Redis-based distributed queue for Node
- [AWS S3](https://aws.amazon.com/s3/) File upload to AWS S3 bucket (you can remove if you don't need it)
- [Formidable]

## Project File Structure
- `src` - All source code
  - `__tests__` - All unit test files
  - `config` - All configuration files
  - `controllers` - All controllers (service layer)
  - `middlewares` - All middlewares (validation, authentication, authorization, etc)
  - `migration` - All database migration files
  - `models` - All database models
  - `repositories` - All repositories (data access layer)
  - `routes` - All routes (API endpoints)
  - `scripts` - All scripts (cron jobs, long or complicated npm scripts)
  - `services` - All services (interacting with other services or third-party APIs)
  - `utils` - All utility functions (helper and library functions)
  - `types` - All custom types (interfaces, enums, etc)
  - `app.ts` - Main application file
  - `index.ts` - Server file (entry point)

## Filename Convention
- All files should be in `camelCase` followed by the _singular_ folder name as then the file extension. Example: `user.model.ts` 
- All folders should be named in `camelCase`.

## How to install from source
- Clone the repository - `git clone repo-link`
- `cd project-folder`
- You need to have valid MariaDB database and Redis connection
- Install dependencies - `yarn install`
- Setup environment variable - `cp .env.example .env`
- Run development server `yarn dev`
- Run test suite `yarn test`
- Run production server `yarn start`

## Using docker
- Clone the repository - `git clone repo-link`
- `cd project-folder`
- Setup environment variable - `cp .env.example .env`
- Start docker container - `docker-compose up -d`
- Run test suite `docker exec -it container-id yarn start`
