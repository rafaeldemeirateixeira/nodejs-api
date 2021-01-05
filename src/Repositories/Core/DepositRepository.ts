import { injectable } from 'inversify';
import { DepositRepositoryInterface } from '../../Support/Interfaces/Repositories/DepositRepositoryInterface';
import Deposit from '../../Models/Core/Deposit';
import { CreateOptions } from 'sequelize/types';

@injectable()
export class DepositRepository implements DepositRepositoryInterface {
    /**
     * @param object data
     * @return Promise<Deposit>
     */
    async create(data: object, options?: CreateOptions<any>): Promise<Deposit> {
        return await Deposit.create(data, options)
    }
}
