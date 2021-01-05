import { NotFoundException } from './../../Exceptions/Http/NotFoundException';
import { UserRepositoryInterface } from '../../Support/Interfaces/Repositories/UserRepositoryInterface';
import { injectable } from 'inversify';
import User from '../../Models/Core/User';

@injectable()
export class UserRepository implements UserRepositoryInterface {
    /**
     * @param object data
     * @return Promise<User>
     */
    async create(data: object): Promise<User> {
        return await User.create(data)
    }

    /**
     * @param string email
     * @returns Promise<boolean>
     */
    async isEmailUnique(email: string): Promise<boolean> {
        return await User
            .findOne({
                where: { email }
            })
            .then(email => email === null)
            .then(isUnique => isUnique);
    }

    /**
     * @param string taxNumber
     * @returns Promise<boolean>
     */
    async isTaxNumberUnique(taxNumber: string): Promise<boolean> {
        return await User
            .findOne({
                where: { tax_number: taxNumber }
            })
            .then(taxNumber => taxNumber === null)
            .then(isUnique => isUnique);
    }

    /**
     * @param email 
     * @returns Promise<User>
     */
    async getUserByEmail(email: string): Promise<User> {
        let user = await User.findOne({
            where: { email }
        });

        if (!user) {
            throw new NotFoundException("Not found");
        }

        return user;
    }

    /**
     * @param taxNumber string 
     * @returns Promise<User>
     */
    async getUserByTaxNumber(taxNumber: string): Promise<User> {
        let user = await User.findOne({
            where: { tax_number: taxNumber },
            include: ['wallet']
        });

        if (!user) {
            throw new NotFoundException("Not found user");
        }

        return user;
    }
}
