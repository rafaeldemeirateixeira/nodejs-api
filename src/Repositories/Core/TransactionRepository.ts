import { injectable } from 'inversify';
import { TransactionRepositoryInterface } from '../../Support/Interfaces/Repositories/TransactionRepositoryInterface';
import Transaction from '../../Models/Core/Transaction';
import { CreateOptions } from 'sequelize/types';
import { BaseRepository } from '../BaseRepository';

@injectable()
export class TransactionRepository extends BaseRepository<Transaction, Transaction> implements TransactionRepositoryInterface {

    constructor() {
        super();
        this.boot(Transaction);
    }

    /**
     * @param data
     * @return Promise<Transaction>
     */
    async createTransaction(data: Transaction['_creationAttributes'], options?: CreateOptions<any>): Promise<Transaction> {
        return await this.create(data, options)
    }

    /**
     * @returns Promise<Array<Transaction>>
     */
    async getAllTransactions(): Promise<Array<Transaction>> {
        return await this.findAll();
    }
}
