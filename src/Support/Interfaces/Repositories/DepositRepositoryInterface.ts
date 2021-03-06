import { CreateOptions } from 'sequelize/types';
import Deposit from "../../../Models/Core/Deposit";

export interface DepositRepositoryInterface {
    /**
     * Register a new deposit
     *
     * @param object data
     * @return Promise<Deposit>
     */
    createDeposit(data: Deposit['_creationAttributes'], options?: CreateOptions<any>): Promise<Deposit>
}
