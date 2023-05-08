import { ValidationError, body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../utils/lib/response";

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
export const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
	const emailCheck = body("email", "Your email is not valid")
		.isEmail()
		.normalizeEmail()
		.run(req);
	const passwordCheck = body(
		"password",
		"Your password must be at least 4 characters"
	)
		.trim()
		.isLength({ min: 4 })
		.run(req);
	await Promise.all([emailCheck, passwordCheck]);
	const errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
		return errorResponse(res, errors.array().join(", "), 400);
	}
	next();
};
