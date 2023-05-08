import express, { Request, Response, Application, NextFunction } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { errorResponse, successResponse } from './utils/lib/response';

const app: Application = express();

// get routes
import routes from './routes/index.route';
import { StatusCodes } from 'http-status-codes';

// set global variables
app.set('trust proxy', true);
// reduce app fingerprint
app.disable('x-powered-by')

// setup middleware
app.use(compression()); // compress all middleware
app.use(helmet()); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// mount routes
app.use('/v1', routes);

// index route
app.get('/', (req: Request, res: Response) => {
    return successResponse(res, 'Welcome to modular backend template service 🚀');
});

// handle 404 routes
app.all('*', async(req: Request, res: Response, next: NextFunction) => {
    return errorResponse(res, `Resource ${req.originalUrl} does not exist`, StatusCodes.NOT_FOUND);
});

// handle global error
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    // log error to logger
    const message = (process.env.NODE_ENV === 'development') ? error.message : 'Something went wrong';
    return errorResponse(res, message, StatusCodes.INTERNAL_SERVER_ERROR);
})

export default app;