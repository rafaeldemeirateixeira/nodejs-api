import { BaseRepository } from './../BaseRepository';
import { CreateOptions } from 'sequelize/types';
import { NotFoundException } from './../../Exceptions/Http/NotFoundException';
import { UserRepositoryInterface } from '../../Support/Interfaces/Repositories/UserRepositoryInterface';
import { injectable } from 'inversify';
import User from '../../Models/Core/User';

@injectable()
export class UserRepository extends BaseRepository<User, User> implements UserRepositoryInterface {

    constructor() {
        super();
        this.boot(User);
    }

    /**
     * @param data
     * @return Promise<User>
     */
    async createUser(data: User['_creationAttributes'], options?: CreateOptions<User>): Promise<User> {
        return await this.create(data, options);
    }

    /**
     * @param email
     * @returns Promise<boolean>
     */
    async isEmailUnique(email: string): Promise<boolean> {
        return await this.findOne({
            where: { email }
        }).then(email => email === null).then(isUnique => isUnique);
    }

    /**
     * @param taxNumber
     * @returns Promise<boolean>
     */
    async isTaxNumberUnique(taxNumber: string): Promise<boolean> {
        return await this.findOne({
            where: { tax_number: taxNumber }
        }).then(taxNumber => taxNumber === null).then(isUnique => isUnique);
    }

    /**
     * @param email 
     * @returns Promise<User>
     */
    async getUserByEmail(email: string): Promise<User> {
        let user = await this.findOne({
            where: { email }
        });

        if (!user) {
            throw new NotFoundException("Not found");
        }

        return user;
    }

    /**
     * @param taxNumber 
     * @returns Promise<User>
     */
    async getUserByTaxNumber(taxNumber: string): Promise<User> {
        let user = await this.findOne({
            where: { tax_number: taxNumber },
            include: ['wallet']
        });

        if (!user) {
            throw new NotFoundException("Not found user");
        }

        return user;
    }

    /**
     * @param userId
     * @param token
     * @return Promise<boolean>
     */
    async registerToken(userId: number, token: string, options?: CreateOptions<any>): Promise<boolean> {
        const data = { token };
        const user = await this.update(data, {
            where: { id: userId },
            transaction: options?.transaction
        })

        return user.shift() === 1;
    }
}
