import { NotFoundException } from './../../Exceptions/Http/NotFoundException';
import { injectable } from 'inversify';
import { WalletRepositoryInterface } from '../../Support/Interfaces/Repositories/WalletRepositoryInterface';
import Wallet from '../../Models/Core/Wallet';

@injectable()
export class WalletRepository implements WalletRepositoryInterface {
    /**
     * @param object data
     * @return Promise<Wallet>
     */
    async create(data: object): Promise<Wallet> {
        return await Wallet.create(data)
    }

    /**
     * @param id number
     * @returns Promise<Wallet>
     * @throws NotFoundException
     */
    async getUserWallet(id: number): Promise<Wallet> {
        let wallet = await Wallet.findByPk(id);

        if (!wallet) {
            throw new NotFoundException("Wallet not found");
        }

        return wallet;
    }
}
