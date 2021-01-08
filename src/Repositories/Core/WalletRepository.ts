import { CreateOptions } from 'sequelize/types';
import { NotFoundException } from './../../Exceptions/Http/NotFoundException';
import { injectable } from 'inversify';
import { WalletRepositoryInterface } from '../../Support/Interfaces/Repositories/WalletRepositoryInterface';
import Wallet from '../../Models/Core/Wallet';
import { BaseRepository } from '../BaseRepository';

@injectable()
export class WalletRepository extends BaseRepository<Wallet, Wallet> implements WalletRepositoryInterface {

    constructor() {
        super();
        this.boot(Wallet);
    }

    /**
     * @param data
     * @return Promise<Wallet>
     */
    async createWallet(data: Wallet['_creationAttributes'], options?: CreateOptions<Wallet>): Promise<Wallet> {
        return await this.create(data, options);
    }

    /**
     * @param id
     * @returns Promise<Wallet>
     * @throws NotFoundException
     */
    async getUserWallet(id: number): Promise<Wallet> {
        let wallet = await this.findByPk(id);

        if (!wallet) {
            throw new NotFoundException("Wallet not found");
        }

        return wallet;
    }
}
