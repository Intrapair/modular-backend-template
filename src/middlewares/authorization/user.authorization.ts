import { NextFunction, Request, Response } from 'express';
import { verifyJwtToken } from '../../utils/helpers/jwt.helper';
import AppError from '../../utils/lib/appError';
import { StatusCodes } from 'http-status-codes';
import tryCatch from '../../utils/helpers/tryCatch.helper';

export const userAuth = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new AppError(
                'Authorization token is missing',
                StatusCodes.FORBIDDEN
            );
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new AppError(
                'Authorization token is missing',
                StatusCodes.FORBIDDEN
            );
        }

        const decodedToken = verifyJwtToken(token);
        // TODO: validate if token exist in db and is not expired
        // TODO: get user from db and attach to req object
        req.app.set('user', decodedToken); // this should be user object or any other thing you might want to save in the request object
        next();
    }
);
