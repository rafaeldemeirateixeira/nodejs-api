import "reflect-metadata";
import { Container } from 'inversify';
import { AuthService } from './../Services/Auth/AuthService';
import { AuthServiceInterface } from './../Support/Interfaces/Services/AuthServiceInterface';
import { TransferService } from './../Services/Core/TransferService';
import { TransferServiceInterface } from './../Support/Interfaces/Services/TransferServiceInterface';
import { UserService } from './../Services/Core/UserService';
import { UserServiceInterface } from './../Support/Interfaces/Services/UserServiceInterface';
import { SERVICE_IDENTIFIER } from "../Enums/ServiceIdentifier";

export class ServiceProvider {
    static register(): Container {
        const container = new Container();

        container.bind<UserServiceInterface>(SERVICE_IDENTIFIER.UserServiceInterface).to(UserService);
        container.bind<AuthServiceInterface>(SERVICE_IDENTIFIER.AuthServiceInterface).to(AuthService);
        container.bind<TransferServiceInterface>(SERVICE_IDENTIFIER.TransferServiceInterface).to(TransferService);

        return container;
    }
}
