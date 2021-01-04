import { ServiceProvider } from './../../Providers/ServiceProvider';
import { Container } from "inversify";

export class Controller {
    /**
     * @var Container
     */
    protected container: Container;

    constructor() {
        this.container = ServiceProvider.register();
    }
}