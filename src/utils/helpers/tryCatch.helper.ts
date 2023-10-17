import { NextFunction, Request, Response } from 'express';

export default (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((error: Error) => {
            if (process.env.NODE_ENV === 'development') console.log(error);
            return next(error);
        });
    };
};
