import { HttpStatusCode } from './../../Enums/HttpStatusCode';
import { HttpException } from './HttpException';

export class NotFoundException extends HttpException {
    message: string;

    constructor(message: string) {
        super(HttpStatusCode.NotFound, message);

        this.message = message;
    }
}
