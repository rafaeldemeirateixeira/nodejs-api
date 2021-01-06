import { HttpStatusCode } from './../Enums/HttpStatusCode';
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from './../Models/Core/User';
import { auth } from "../../config/auth";

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(HttpStatusCode.Unauthorized).send('No token provided');
    }

    jwt.verify(authorization, auth.jwt_secret, async (error: any, decoded: any) => {
        if (error) {
            return response.status(HttpStatusCode.Unauthorized).send('Failed to authenticate token.');
        }

        const user = await User.findByPk(decoded.id);

        if (!user) {
            return response.status(HttpStatusCode.Unauthorized).send('Unauthorized token');
        }

        request.user = user;
        next();
    });
}
