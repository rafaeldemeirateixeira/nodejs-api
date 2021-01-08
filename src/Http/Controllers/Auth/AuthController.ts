import { AuthServiceInterface } from './../../../Support/Interfaces/Services/AuthServiceInterface';
import { Request, Response } from 'express';
import { UserServiceInterface } from '../../../Support/Interfaces/Services/UserServiceInterface';
import { Controller } from '../Controller';
import { SERVICE_IDENTIFIER } from '../../../Enums/ServiceIdentifier';

export class AuthController extends Controller {
    /**
     * @var AuthServiceInterface
     */
    authService: AuthServiceInterface;

    constructor() {
        super();
        this.authService = this.container.get<AuthServiceInterface>(SERVICE_IDENTIFIER.AuthServiceInterface);
    }

    /**
     * Authenticate user.
     *
     * @param request
     * @param response
     */
    async login(request: Request, response: Response) {
        const user = await this.authService.authenticate(request.body);
        return response.status(201).json(user);
    }
}
