import { Request } from 'express';
import { Transfer } from './../../../../@types/services/index.d';
import { Transaction } from "../../../Models/Core/Transaction";
import User from "../../../Models/Core/User";

export interface TransferServiceInterface {
    /**
     * Register a new user in database
     *
     * @param user User
     * @param data object
     * @return Promise<object>
     */
    store(user: User, data: Transfer): Promise<object>

    /**
     * List all transfers
     *
     * @return Promise<object>
     */
    index(request: Request): Promise<{ total: number, data: Transaction[] }>
}
