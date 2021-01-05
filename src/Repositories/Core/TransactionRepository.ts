import { injectable } from 'inversify';
import { TransactionRepositoryInterface } from '../../Support/Interfaces/Repositories/TransactionRepositoryInterface';
import Transaction from '../../Models/Core/Transaction';
import { CreateOptions } from 'sequelize/types';

@injectable()
export class TransactionRepository implements TransactionRepositoryInterface {
    /**
     * @param object data
     * @return Promise<Transaction>
     */
    async create(data: object, options?: CreateOptions<any>): Promise<Transaction> {
        return await Transaction.create(data, options)
    }

    /**
     * @returns Promise<Array<Transaction>>
     */
    async getAllTransactions(): Promise<Array<Transaction>> {
        return await Transaction.findAll();
    }
}
