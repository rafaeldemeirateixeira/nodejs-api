import { injectable } from 'inversify';
import { WithdrawRepositoryInterface } from '../../Support/Interfaces/Repositories/WithdrawRepositoryInterface';
import Withdraw from '../../Models/Core/Withdraw';
import { CreateOptions } from 'sequelize/types';

@injectable()
export class WithdrawRepository implements WithdrawRepositoryInterface {
    /**
     * @param object data
     * @return Promise<Withdraw>
     */
    async create(data: object, options?: CreateOptions<any>): Promise<Withdraw> {
        return await Withdraw.create(data, options)
    }
}
