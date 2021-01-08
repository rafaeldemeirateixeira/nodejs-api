import { CreateOptions } from 'sequelize/types';
import Wallet from "../../../Models/Core/Wallet";

export interface WalletRepositoryInterface {
    /**
     * Register a new wallet
     *
     * @param object data
     * @return Promise<Wallet>
     */
    createWallet(data: Wallet['_creationAttributes'], options?: CreateOptions<Wallet>): Promise<Wallet>

    /**
     * @param id number
     * @return Promise<number>
     */
    getUserWallet(id: number): Promise<Wallet>
}
