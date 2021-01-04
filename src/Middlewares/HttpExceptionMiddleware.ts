import { NextFunction, Request, Response } from "express";
import { HttpException } from "../Exceptions/Http/HttpException";

const httpExceptionMiddleware = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof HttpException) {
        return response.status(error.status).json({
            status: error.status,
            message: error.message
        });
    }

    next(error);
};

export default httpExceptionMiddleware;
