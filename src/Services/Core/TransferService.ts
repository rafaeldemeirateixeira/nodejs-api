import { HttpStatusCode } from './../../Enums/HttpStatusCode';
import { TransactionType } from './../../Enums/TypeTransaction';
import { SequelizeConnection } from './../../../database/SequelizeConnection';
import { HttpException } from './../../Exceptions/Http/HttpException';
import { Wallet } from './../../Models/Core/Wallet';
import { injectable } from 'inversify';
import { REPOSITORY_IDENTIFIER } from '../../Enums/RepositoryIdentifier';
import { Service } from '../Service';
import { TransferServiceInterface } from '../../Support/Interfaces/Services/TransferServiceInterface';
import { DepositRepositoryInterface } from '../../Support/Interfaces/Repositories/DepositRepositoryInterface';
import { WithdrawRepositoryInterface } from '../../Support/Interfaces/Repositories/WithdrawRepositoryInterface';
import { WalletRepositoryInterface } from '../../Support/Interfaces/Repositories/WalletRepositoryInterface';
import { v4 as uuid } from 'uuid';
import { User } from '../../Models/Core/User';
import { UserRepositoryInterface } from '../../Support/Interfaces/Repositories/UserRepositoryInterface';
import { TransactionRepositoryInterface } from '../../Support/Interfaces/Repositories/TransactionRepositoryInterface';
import Transaction from '../../Models/Core/Transaction';
import { Transfer } from '../../../@types/services';

@injectable()
export class TransferService extends Service implements TransferServiceInterface {
    /**
     * @var DepositRepositoryInterface
     */
    private depositRepository: DepositRepositoryInterface;

    /**
     * @var WithdrawRepositoryInterface
     */
    private withdrawRepository: WithdrawRepositoryInterface;

    /**
     * @var WalletRepositoryInterface
     */
    private walletRepository: WalletRepositoryInterface;

    /**
     * @var UserRepositoryInterface
     */
    private userRepository: UserRepositoryInterface;

    /**
     * @var TransactionRepositoryInterface
     */
    private transactionRepository: TransactionRepositoryInterface;

    /**
     * Constructor of class
     */
    constructor() {
        super();
        this.depositRepository = this.container
            .get<DepositRepositoryInterface>(REPOSITORY_IDENTIFIER.DepositRepositoryInterface);
        this.withdrawRepository = this.container
            .get<WithdrawRepositoryInterface>(REPOSITORY_IDENTIFIER.WithdrawRepositoryInterface);
        this.walletRepository = this.container
            .get<WalletRepositoryInterface>(REPOSITORY_IDENTIFIER.WalletRepositoryInterface);
        this.userRepository = this.container
            .get<UserRepositoryInterface>(REPOSITORY_IDENTIFIER.UserRepositoryInterface);
        this.transactionRepository = this.container
            .get<TransactionRepositoryInterface>(REPOSITORY_IDENTIFIER.TransactionRepositoryInterface);
    }

    /**
     * @return Promise<Array<Transaction>>
     */
    async index(): Promise<Array<Transaction>> {
        return await this.transactionRepository.getAllTransactions();
    }

    /**
     * @param user
     * @param data
     * @return Promise<object>
     */
    async store(user: User, data: Transfer): Promise<object> {
        const txid = uuid();
        const senderUser: User = await user.reload({ include: ['wallet'] });
        const senderWallet: Wallet = senderUser.wallet;
        const receiverUser: User = await this.userRepository.getUserByTaxNumber(data.document);
        const receiverWallet: Wallet = receiverUser.wallet;

        if (senderWallet.getBalance() < data.amount) {
            throw new HttpException(HttpStatusCode.PreconditionFailed, "Insufficient funds");
        }

        if (data.document == senderUser.tax_number) {
            throw new HttpException(HttpStatusCode.Conflict, "The recipient's account is the same as the sender");
        }

        try {
            const transfer = await SequelizeConnection.init().transaction(async (transaction) => {
                const withdraw = await this.withdrawRepository.createWithdraw({
                    user_id: senderUser.id,
                    amount: data.amount,
                    type: TransactionType.TRANSFER,
                    txid
                }, {
                    transaction: transaction
                });

                senderWallet.removeBalance(data.amount);
                await senderWallet.save({ transaction: transaction });

                const deposit = await this.depositRepository.createDeposit({
                    user_id: receiverUser.id,
                    amount: data.amount,
                    type: TransactionType.TRANSFER,
                    txid
                }, { transaction: transaction });

                receiverWallet.addBalance(data.amount);
                await receiverWallet.save({ transaction: transaction });

                const transfer = await this.transactionRepository.createTransaction({
                    deposit_id: deposit.id,
                    withdraw_id: withdraw.id,
                    amount: data.amount,
                    txid,
                    type: TransactionType.TRANSFER
                }, { transaction: transaction });

                return {
                    transaction_id: transfer.id,
                    txid,
                    transfer: data.amount,
                    balance: senderWallet.amount
                };
            });

            return transfer;
        } catch (error) {
            // TODO: Registrar logs de erros
            console.log(error);
            throw new HttpException(HttpStatusCode.InternalServerError, "Internal error");
        }
    }
}
