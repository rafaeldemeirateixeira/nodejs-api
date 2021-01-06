import { HttpStatusCode } from './../../Enums/HttpStatusCode';
import { HttpException } from './../../Exceptions/Http/HttpException';
import { injectable } from 'inversify';
import { AuthServiceInterface } from './../../Support/Interfaces/Services/AuthServiceInterface';
import { REPOSITORY_IDENTIFIER } from '../../Enums/RepositoryIdentifier';
import { Service } from '../Service';
import { UserRepositoryInterface } from '../../Support/Interfaces/Repositories/UserRepositoryInterface';
import bcrypt from 'bcryptjs';
import User from '../../Models/Core/User';
import jwt from 'jsonwebtoken';
import { auth } from '../../../config/auth';

@injectable()
export class AuthService extends Service implements AuthServiceInterface {
    /**
     * @var UserRepositoryInterface
     */
    private userRepository: UserRepositoryInterface;

    /**
     * Constructor of class
     */
    constructor() {
        super();
        this.userRepository = this.container
            .get<UserRepositoryInterface>(REPOSITORY_IDENTIFIER.UserRepositoryInterface);
    }

    /**
     * @param data any
     * @return Promise<User>
     * @throws HttpException
     */
    async authenticate(data: any): Promise<object> {
        switch (data.grant_type) {
            case 'password':
                return await this.password(data.email, data.password)
            case 'biometric':
                throw new HttpException(405, "Not implemented");
            default:
                throw new HttpException(403, "Unauthorized");
        }
    }

    /**
     * Authenticate user by password
     *
     * @param email string
     * @param password string
     * @returns Promise<object>
     * @throws HttpException | Error
     */
    async password(email: string, password: string): Promise<object> {
        try {
            let user: User = await this.userRepository.getUserByEmail(email);

            if (!await this.compare(user, password)) {
                throw new HttpException(HttpStatusCode.Unauthorized, "Wrong credentials");
            }

            let token = this.getToken(user.id);

            if (!await this.setToken(user.id, token)) {
                throw new HttpException(HttpStatusCode.Forbidden, "User not authorized");
            }

            return {
                id: user.id,
                token,
                expires: auth.expires_in,
                grant_type: 'password'
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param user User
     * @param password string
     * @returns Promise<boolean>
     */
    private async compare(user: User, password: string): Promise<boolean> {
        return await bcrypt.compare(password, user.password);
    }

    /**
     * @param id number
     * @return string
     */
    private getToken(id: number): string {
        return jwt.sign({ id }, auth.jwt_secret, {
            expiresIn: auth.expires_in
        })
    }

    /**
     * @param userId number
     * @param token string
     * @return Promise<boolean>
     */
    private async setToken(userId: number, token: string): Promise<boolean> {
        return await this.userRepository.registerToken(userId, token);
    }
}
