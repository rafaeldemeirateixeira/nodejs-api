import "reflect-metadata";
import { Container } from 'inversify';
import { UserRepository } from './../Repositories/Core/UserRepository';
import { UserRepositoryInterface } from './../Support/Interfaces/Repositories/UserRepositoryInterface';
import { REPOSITORY_IDENTIFIER } from '../Enums/RepositoryIdentifier';

export class RepositoryProvider {
    static register(): Container {
        const container = new Container();

        container.bind<UserRepositoryInterface>(REPOSITORY_IDENTIFIER.UserRepositoryInterface).to(UserRepository);

        return container;
    }
}
