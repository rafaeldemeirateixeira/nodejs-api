import { HttpStatusCode } from './../../Enums/HttpStatusCode';
import { injectable } from 'inversify';
import { HttpException } from './../../Exceptions/Http/HttpException';
import { REPOSITORY_IDENTIFIER } from './../../Enums/RepositoryIdentifier';
import User from '../../Models/Core/User';
import { UserRepositoryInterface } from '../../Support/Interfaces/Repositories/UserRepositoryInterface';
import { UserServiceInterface } from '../../Support/Interfaces/Services/UserServiceInterface';
import { Service } from './../Service';

@injectable()
export class UserService extends Service implements UserServiceInterface {
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
     * @param object data
     * @return Promise<User>
     */
    async store(data: User): Promise<User> {
        const isEmailUnique = await this.userRepository.isEmailUnique(data.email);
        if (!isEmailUnique) {
            throw new HttpException(HttpStatusCode.BadRequest, 'Email data conflict found.');
        }

        const isTaxNumberUnique = await this.userRepository.isTaxNumberUnique(data.tax_number);
        if (!isTaxNumberUnique) {
            throw new HttpException(HttpStatusCode.BadRequest, 'Tax number data conflict found.');
        }

        return await this.userRepository.create(data);
    }
}
