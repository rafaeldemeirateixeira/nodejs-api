import { injectable } from 'inversify';
import { WithdrawRepositoryInterface } from '../../Support/Interfaces/Repositories/WithdrawRepositoryInterface';
import Withdraw from '../../Models/Core/Withdraw';
import { CreateOptions } from 'sequelize/types';
import { BaseRepository } from '../BaseRepository';
import { With } from 'knex';

@injectable()
export class WithdrawRepository extends BaseRepository<Withdraw, Withdraw> implements WithdrawRepositoryInterface {

    constructor() {
        super();
        this.boot(Withdraw);
    }

    /**
     * @param object data
     * @return Promise<Withdraw>
     */
    async createWithdraw(data: Withdraw['_creationAttributes'], options?: CreateOptions<any>): Promise<Withdraw> {
        return await this.create(data, options)
    }
}
