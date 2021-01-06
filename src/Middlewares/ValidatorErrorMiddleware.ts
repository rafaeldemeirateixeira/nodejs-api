import { HttpStatusCode } from './../Enums/HttpStatusCode';
import { isCelebrateError } from "celebrate";
import { NextFunction, Request, Response } from "express";
import HTTP from 'http';

const validatorErrorMiddleware = (error: any, request: Request, response: Response, next: NextFunction) => {
    if (!isCelebrateError(error)) {
        return next(error);
    }

    const validation: any = {};

    for (const [segment, joiError] of error.details.entries()) {
        validation[segment] = joiError.message;
    }

    const result = {
        status: HttpStatusCode.BadRequest,
        message: HTTP.STATUS_CODES[HttpStatusCode.BadRequest],
        error: validation,
    };

    return response.status(HttpStatusCode.BadRequest).send(result);
}

export default validatorErrorMiddleware;
