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

    /**
     * List all tranfers.
     *
     * @param request
     * @param response
     */
    async index(request: Request, response: Response) {
        const transfers = await this.transferService.index(request);
        return response.json(transfers);
    }

    /**
     * Create a new transfer.
     *
     * @param request
     * @param response
     */
    async store(request: Request, response: Response) {
        const transfer = await this.transferService.store(request.user, request.body);
        return response.status(201).json(transfer);
    }
}
