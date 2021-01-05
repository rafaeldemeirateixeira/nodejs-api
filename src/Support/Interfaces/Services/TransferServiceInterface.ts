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
    store(user: User, data: object): Promise<object>

    /**
     * List all transfers
     *
     * @return Promise<object>
     */
    index(): Promise<Array<Transaction>>
}
