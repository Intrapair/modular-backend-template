import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../../utils/lib/response";
import { verifyJwtToken } from "../../utils/helpers/jwt.helper";

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		return errorResponse(res, "Authorization header missing", 401);
	}
	const token = authHeader.split(" ")[1];
	if (!token) {
		return errorResponse(res, "Authorization token missing", 401);
	}
	try {
		const decodedToken = verifyJwtToken(token);
		// TODO: validate if token exist in db and is not expired
		// TODO: get user from db and attach to req object
		req.app.set("user", decodedToken); // this should be user object or any other thing you might want to save in the request object
		next();
	} catch (error) {
		return errorResponse(res, "Invalid authorization token", 401);
	}
};
