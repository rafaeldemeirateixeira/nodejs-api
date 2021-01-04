import "reflect-metadata";
import { Container } from 'inversify';
import { AuthService } from './../Services/Auth/AuthService';
import { AuthServiceInterface } from './../Support/Interfaces/Services/AuthServiceInterface';
import { UserService } from './../Services/Core/UserService';
import { UserServiceInterface } from './../Support/Interfaces/Services/UserServiceInterface';
import { SERVICE_IDENTIFIER } from "../Enums/ServiceIdentifier";

export class ServiceProvider {
    static register(): Container {
        const container = new Container();

        container.bind<UserServiceInterface>(SERVICE_IDENTIFIER.UserServiceInterface).to(UserService);
        container.bind<AuthServiceInterface>(SERVICE_IDENTIFIER.AuthServiceInterface).to(AuthService);

        return container;
    }
}
