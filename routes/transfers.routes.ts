import { Router } from 'express';
import { TransferController } from '../src/Http/Controllers/Core/TransferController';
import { transferValidator } from '../src/Http/Validators/Core/TransferValidator';
import { authMiddleware } from '../src/Middlewares/AuthMiddleware';

const transferController = new TransferController();
const router = Router();

router.post('/', transferValidator, authMiddleware, async (request, response, next) => {
    try {
        return await transferController.store(request, response);
    } catch (error) {
        next(error);
    }
});

router.get('/', authMiddleware, async (request, response, next) => {
    try {
        return await transferController.index(request, response);
    } catch (error) {
        next(error);
    }
});

export default router;
