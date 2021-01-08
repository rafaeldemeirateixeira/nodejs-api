import { CreateOptions } from 'sequelize/types';
import Withdraw from "../../../Models/Core/Withdraw";

export interface WithdrawRepositoryInterface {
    /**
     * Register a new withdraw
     *
     * @param object data
     * @return Promise<Withdraw>
     */
    createWithdraw(data: Withdraw['_creationAttributes'], options?: CreateOptions<any>): Promise<Withdraw>
}
