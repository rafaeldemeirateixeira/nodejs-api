import Wallet from "../../../Models/Core/Wallet";

export interface WalletRepositoryInterface {
    /**
     * Register a new wallet
     *
     * @param object data
     * @return Promise<Wallet>
     */
    create(data: object): Promise<Wallet>

    /**
     * @param id number
     * @return Promise<number>
     */
    getUserWallet(id: number): Promise<Wallet>
}
