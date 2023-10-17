import { NextFunction, Request, Response } from 'express';
import { successResponse } from '../utils/lib/response';
import { StatusCodes } from 'http-status-codes';
import tryCatch from '../utils/helpers/tryCatch.helper';
import { IUsers } from '../types/user.types';

/**
 * Get all users based on the query parameters
 * @param req The request object
 * @param res The response object
 * @param next The next function
 * @returns ISuccessResponse | IErrorResponse
 */
export const getAllUsers = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.query.err == '1') throw new Error('Something went wrong');
        const data: IUsers[] = [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
            },
            {
                id: 2,
                name: 'Jane Doe',
                email: 'jane@example.com',
            },
        ];
        return successResponse(
            res,
            'Users retrieved successfully',
            {
                data,
            },
            StatusCodes.OK
        );
    }
);
