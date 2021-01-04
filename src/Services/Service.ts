import { RepositoryProvider } from './../Providers/RepositoryProvider';
import { Container, injectable } from "inversify";

@injectable()
export class Service {
    /**
     * @var Container
     */
    protected container: Container;

    constructor() {
        this.container = RepositoryProvider.register();
    }
}