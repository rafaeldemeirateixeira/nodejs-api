import { Request, Response } from 'express';
import { UserServiceInterface } from './../../../Support/Interfaces/Services/UserServiceInterface';
import { Controller } from '../Controller';
import { SERVICE_IDENTIFIER } from '../../../Enums/ServiceIdentifier';

export class UserController extends Controller {
    /**
     * @var UserServiceInterface
     */
    userService: UserServiceInterface;

    constructor() {
        super();
        this.userService = this.container.get<UserServiceInterface>(SERVICE_IDENTIFIER.UserServiceInterface);
    }

    /**
     * Create a new user.
     *
     * @param request
     * @param response
     */
    async store(request: Request, response: Response) {
        const user = await this.userService.store(request.body);
        return response.status(201).json(user);
    }
}
