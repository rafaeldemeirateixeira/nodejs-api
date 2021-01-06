import { authMiddleware } from './../src/Middlewares/AuthMiddleware';
import { Router } from 'express';
import { userValidator } from '../src/Http/Validators/Core/UserValidator';
import { UserController } from '../src/Http/Controllers/Core/UserController';

const userController = new UserController();
const router = Router();

router.post('/', userValidator, async (request, response, next) => {
    try {
        return await userController.store(request, response);
    } catch (error) {
        next(error);
    }
});

router.get('/me', authMiddleware, (request, response, next) => {
    return response.json(request.user);
});

export default router;
