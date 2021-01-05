import "reflect-metadata";
import { Container } from 'inversify';
import { UserRepository } from './../Repositories/Core/UserRepository';
import { DepositRepository } from './../Repositories/Core/DepositRepository';
import { TransactionRepository } from './../Repositories/Core/TransactionRepository';
import { WithdrawRepository } from './../Repositories/Core/WithdrawRepository';
import { WalletRepository } from './../Repositories/Core/WalletRepository';
import { UserRepositoryInterface } from './../Support/Interfaces/Repositories/UserRepositoryInterface';
import { REPOSITORY_IDENTIFIER } from '../Enums/RepositoryIdentifier';
import { DepositRepositoryInterface } from "../Support/Interfaces/Repositories/DepositRepositoryInterface";
import { TransactionRepositoryInterface } from './../Support/Interfaces/Repositories/TransactionRepositoryInterface';
import { WithdrawRepositoryInterface } from "../Support/Interfaces/Repositories/WithdrawRepositoryInterface";
import { WalletRepositoryInterface } from "../Support/Interfaces/Repositories/WalletRepositoryInterface";

export class RepositoryProvider {
    static register(): Container {
        const container = new Container();

        container.bind<UserRepositoryInterface>(REPOSITORY_IDENTIFIER.UserRepositoryInterface).to(UserRepository);
        container.bind<DepositRepositoryInterface>(REPOSITORY_IDENTIFIER.DepositRepositoryInterface).to(DepositRepository);
        container.bind<WithdrawRepositoryInterface>(REPOSITORY_IDENTIFIER.WithdrawRepositoryInterface).to(WithdrawRepository);
        container.bind<WalletRepositoryInterface>(REPOSITORY_IDENTIFIER.WalletRepositoryInterface).to(WalletRepository);
        container.bind<TransactionRepositoryInterface>(REPOSITORY_IDENTIFIER.TransactionRepositoryInterface).to(TransactionRepository);

        return container;
    }
}
