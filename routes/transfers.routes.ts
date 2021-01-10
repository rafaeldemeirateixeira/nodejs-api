import { Router } from 'express';
import { TransferController } from '../src/Http/Controllers/Core/TransferController';
import { createTransfer, getAllTransfer } from '../src/Http/Validators/Core/TransferValidator';
import { authMiddleware } from '../src/Middlewares/AuthMiddleware';

const transferController = new TransferController();
const router = Router();

router.post('/', createTransfer, authMiddleware, async (request, response, next) => {
    try {
        return await transferController.store(request, response);
    } catch (error) {
        next(error);
    }
});

router.get('/', getAllTransfer, authMiddleware, async (request, response, next) => {
    try {
        return await transferController.index(request, response);
    } catch (error) {
        next(error);
    }
});

export default router;
