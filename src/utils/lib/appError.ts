/**
 * AppError
 */
export default class AppError extends Error {
    public statusCode: number = 500;

    constructor(message: string, statusCode?: number) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.statusCode = statusCode || this.statusCode;
    }
}
