import express, { Request, Response, Application, NextFunction } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { errorResponse, successResponse } from './utils/lib/response';
import { StatusCodes } from 'http-status-codes';
import AppError from './utils/lib/appError';
import logger from './services/logger.service';

const app: Application = express();

// get routes
import routes from './routes/index.route';

// set global variables
app.set('trust proxy', true);
// reduce app fingerprint
app.disable('x-powered-by');

// setup middleware
app.use(compression()); // compress all middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes
app.use('/v1', routes);

// index route
app.get('/', (req: Request, res: Response) => {
    return successResponse(
        res,
        'Welcome to modular backend template service 🚀'
    );
});

// handle 404 routes
app.all('*', async (req: Request, res: Response, next: NextFunction) => {
    return errorResponse(
        res,
        `Resource ${req.originalUrl} does not exist`,
        StatusCodes.NOT_FOUND
    );
});

// handle global error
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
    logger.error(error);
    const message =
        error.name === 'Error' ? 'Something went wrong' : error.message;
    const statusCode =
        error.name === 'Error'
            ? StatusCodes.INTERNAL_SERVER_ERROR
            : error.statusCode ?? StatusCodes.BAD_REQUEST;
    return errorResponse(res, message, statusCode);
});

export default app;
