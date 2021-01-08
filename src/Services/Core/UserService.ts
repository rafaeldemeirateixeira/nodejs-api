import { SequelizeConnection } from './../../../database/SequelizeConnection';
import { WalletRepositoryInterface } from './../../Support/Interfaces/Repositories/WalletRepositoryInterface';
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
     * @var WalletRepositoryInterface
     */
    private walletRepository: WalletRepositoryInterface;

    /**
     * Constructor of class
     */
    constructor() {
        super();
        this.userRepository = this.container
            .get<UserRepositoryInterface>(REPOSITORY_IDENTIFIER.UserRepositoryInterface);
        this.walletRepository = this.container
            .get<WalletRepositoryInterface>(REPOSITORY_IDENTIFIER.WalletRepositoryInterface);
    }

    /**
     * @param object data
     * @return Promise<User>
     */
    async store(data: User['_creationAttributes']): Promise<User> {
        const isEmailUnique = await this.userRepository.isEmailUnique(data.email);
        if (!isEmailUnique) {
            throw new HttpException(HttpStatusCode.BadRequest, 'Email data conflict found.');
        }

        const isTaxNumberUnique = await this.userRepository.isTaxNumberUnique(data.tax_number);
        if (!isTaxNumberUnique) {
            throw new HttpException(HttpStatusCode.BadRequest, 'Tax number data conflict found.');
        }

        try {
            const createUser = await SequelizeConnection.init().transaction(async (transaction) => {

                const user = await this.userRepository.createUser(data, {
                    transaction
                });

                await this.walletRepository.createWallet({
                    user_id: user.id,
                    amount: 0
                }, { transaction });

                return user;
            });

            return createUser;
        } catch (error) {
            throw new HttpException(HttpStatusCode.InternalServerError, "Internal error");
        }
    }
}
