import { ModelStatic, WhereOptions } from 'sequelize';
import { injectable } from 'inversify';
import { DepositRepositoryInterface } from '../../Support/Interfaces/Repositories/DepositRepositoryInterface';
import Deposit from '../../Models/Core/Deposit';
import { CreateOptions } from 'sequelize/types';
import { BaseRepository } from '../BaseRepository';

@injectable()
export class DepositRepository extends BaseRepository<Deposit, Deposit> implements DepositRepositoryInterface {
    constructor() {
        super();
        this.boot(Deposit);
    }

    /**
     * @param object data
     * @return Promise<Deposit>
     */
    async createDeposit(data: Deposit['_creationAttributes'], options?: CreateOptions<any>): Promise<Deposit> {
        return await this.create(data, options)
    }
}
