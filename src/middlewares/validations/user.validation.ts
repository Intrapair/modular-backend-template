import { ValidationError, body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import AppError from '../../utils/lib/appError';
import { StatusCodes } from 'http-status-codes';
import tryCatch from '../../utils/helpers/tryCatch.helper';

const errorFormatter = ({ msg }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return msg;
};

/**
 * Validate login request body
 * @param req The request object
 * @param res The response object
 * @param next The next function
 * @returns ErrorResponse | NextFunction
 */
export const loginValidator = tryCatch(
    async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all([
            body('email')
                .trim()
                .notEmpty()
                .withMessage('Email is required')
                .isEmail()
                .withMessage('Email is not valid')
                .normalizeEmail()
                .run(req),
            body('password')
                .trim()
                .notEmpty()
                .withMessage('Password is required')
                .isLength({ min: 4 })
                .withMessage('Password must be at least 4 characters')
                .run(req),
        ]);
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            throw new AppError(
                errors.array().join(', '),
                StatusCodes.BAD_REQUEST
            );
        }
        next();
    }
);
