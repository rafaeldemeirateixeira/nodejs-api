import { CreateOptions } from 'sequelize/types';
import Transaction from "../../../Models/Core/Transaction";

export interface TransactionRepositoryInterface {
    /**
     * Register a new transaction
     *
     * @param object data
     * @return Promise<Transaction>
     */
    createTransaction(data: Transaction['_creationAttributes'], options?: CreateOptions<any>): Promise<Transaction>

    /**
     * List all transactions
     *
     * @returns Promise<Array<Transaction>>
     */
    getAllTransactions(page?: number): Promise<{ total: number, data: Transaction[] }>
}
