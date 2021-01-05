import { Request, Response } from 'express';
import { TransferServiceInterface } from '../../../Support/Interfaces/Services/TransferServiceInterface';
import { Controller } from '../Controller';
import { SERVICE_IDENTIFIER } from '../../../Enums/ServiceIdentifier';

export class TransferController extends Controller {
    /**
     * @var TransferServiceInterface
     */
    transferService: TransferServiceInterface;

    constructor() {
        super();
        this.transferService = this.container.get<TransferServiceInterface>(SERVICE_IDENTIFIER.TransferServiceInterface);
    }

    async index(request: Request, response: Response) {
        const transfers = await this.transferService.index();
        return response.json(transfers);
    }

    async store(request: Request, response: Response) {
        const transfer = await this.transferService.store(request.user, request.body);
        return response.status(201).json(transfer);
    }
}
