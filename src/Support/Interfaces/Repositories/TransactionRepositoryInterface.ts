import { CreateOptions } from 'sequelize/types';
import Transaction from "../../../Models/Core/Transaction";

export interface TransactionRepositoryInterface {
    /**
     * Register a new transaction
     *
     * @param object data
     * @return Promise<Transaction>
     */
    create(data: object, options?: CreateOptions<any>): Promise<Transaction>

    /**
     * List all transactions
     *
     * @returns Promise<Array<Transaction>>
     */
    getAllTransactions(): Promise<Array<Transaction>>
}
